import { login, getDaysOfWeek, getFirstDayOfMonth, decryptPassword, calculateWeighted, calculateUnweighted } from '$lib';
import { fail, redirect } from '@sveltejs/kit'

export async function load({ url, cookies, locals: { supabase, getSession } }) {
  const session = await getSession()
  if (!session) {
    throw redirect(302, '/')
  }
  const userID = session.user.id
  //grab players data from supabase
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', userID);
  if (error != null) {
    console.error(error.message)
  }
  if (data.length <= 0) {
    //user needs to do the signup process
    throw redirect(302, `/signup`)
  }
  //check for pass cookie
  let encrypted_password = cookies.get("svk-p-s-629542")
  if (!encrypted_password) {
    throw redirect(303, '/login')
  }
  let password = decryptPassword(encrypted_password)
  //get studentvue data
  const { data: schoolData, error: schoolError } = await supabase
    .from('schools')
    .select()
    .eq('school_id', data[0].school_id);
  if (schoolError != null) {
    console.error(schoolError.message)
  }
  let client = await login(schoolData[0].school_studentvue_url, data[0].student_number, password);
  let grades_return = await client.getGradebook();
  let grades_json = JSON.parse(grades_return);

  if (!grades_json.Gradebook) {
    cookies.delete('svk-p-s-629542', { path: '/' });
    throw redirect(302, `/login`)
  }
  let course_grades = grades_json.Gradebook.Courses.Course.map((course) => ({
    name: course.Title.replace(/\s+/g, ' '),
    grade: parseFloat(course.Marks.Mark[0].CalculatedScoreRaw),
    assignment_list: course.Marks.Mark[0].Assignments.Assignment
  }));
  //get course info
  const { data: user_in_course_data, error: courseError1 } = await supabase
    .from('users_in_courses')
    .select()
    .eq('user_id', userID);
  if (courseError1 != null) {
    console.error(courseError1.message)
  }
  //contains course ids
  const course_list = user_in_course_data.map(value => (value.course_id));
  const { data: course_data, error: courseError2 } = await supabase
    .from('courses')
    .select()
    .in('course_id', course_list);
  if (courseError2 != null) {
    console.error(courseError2.message)
  }
  let courses_with_grades = course_grades.map(course1 => {
    const matchingCourse = course_data.find(course => course1.name === course.course_name);
    return matchingCourse ? { "grade": course1.grade, "assignment_list": course1.assignment_list, "known_assignments": user_in_course_data.find(course => matchingCourse.course_id === course.course_id).grade_id_list, ...matchingCourse } : null;
  }).filter(Boolean);
  //calculate gpa
  let weightedGPA = 0;
  let unweightedGPA = 0;
  courses_with_grades.forEach(course => {
    weightedGPA += calculateWeighted(course)
    unweightedGPA += calculateUnweighted(course)
  })
  weightedGPA /= courses_with_grades.length;
  unweightedGPA /= courses_with_grades.length;
  //get new grades
  const grades = courses_with_grades.map(course => {
    // Destructure the item and extract the 'name' property
    const { known_assignments, ...rest } = course;
    if (course.assignment_list.length > 0) {
      const filteredAssignments = course.assignment_list.filter(assignment => {
        const gradebookID = parseInt(assignment.GradebookID, 10);
        let score = assignment.Score.replace(/0+$/, '').replace(/\.$/, '');
        if (score === "Not Graded" || score === "Not Due") {
          return false;
        }
        return !known_assignments.includes(gradebookID);
      });
      // Create a new object with the remaining properties and the modified 'fullName' property
      return {
        ...rest,
        new_assignments: filteredAssignments, // Changing the value of 'name' to 'fullName'
        new_assignments_list_of_ids: filteredAssignments.map(value => value.GradebookID).join()
      };
    }
    return {
      ...rest,
      new_assignments: [], // Changing the value of 'name' to 'fullName'
      new_assignments_list_of_ids: []
    };
  });
  //fetch todos
  const { data: custom_todo_data, error: courseError3 } = await supabase
    .from('custom_todos')
    .select()
    .eq('user_id', userID);
  if (courseError3 != null) {
    console.error(courseError3.message)
  }
  const { data: course_todo_data, error: courseError4 } = await supabase
    .from('canvas_assignments')
    .select()
    .in('course_id', course_list);
  if (courseError4 != null) {
    console.error(courseError4.message)
  }
  const { data: user_canvas_todo_data, error: courseError5 } = await supabase
    .from('users_canvas_assignments')
    .select()
    .eq('user_id', userID);
  if (courseError5 != null) {
    console.error(courseError5.message)
  }
  const user_assignments = user_canvas_todo_data.map(value => (value.assignment_id));
  let new_assignments = course_todo_data.map((assignment) => {
    let date = user_in_course_data.filter(x => x.course_id === assignment.course_id)
    const last_sign_in_date = new Date(date[0].last_sign_in_time)
    const assignment_date = new Date(assignment.created_at)
    if (last_sign_in_date > assignment_date) {
      return undefined;
    } else {
      return { new: true, ...assignment };
    }
  }).filter(value => value !== undefined);
  let current_assignments = course_todo_data.filter(value => user_assignments.includes(value.assignment_id));
  //fetch clubs
  const { data: user_in_club_data, error: clubError } = await supabase
    .from('users_in_clubs')
    .select('*')
    .eq('user_id', userID);
  if (clubError != null) {
    console.error(clubError.message)
  }
  //contains course ids
  const club_list = user_in_club_data.map(value => (value.club_id));
  const { data: club_data, error: clubError1 } = await supabase
    .from('clubs')
    .select()
    .in('club_id', club_list);
  if (clubError1 != null) {
    console.error(clubError1.message)
  }
  const { data: all_club_data, error: clubError2 } = await supabase
    .from('clubs')
    .select()
    .eq('school_id', data[0].school_id)
  if (clubError2 != null) {
    console.error(clubError2.message)
  }
  return {
    user_data: data[0],
    custom_todo_data,
    current_assignments,
    new_assignments,
    user_in_course_data,
    club_data,
    all_club_data,
    grades,
    weightedGPA,
    unweightedGPA
  }
}
export const actions = {
  signout: async ({ cookies, locals: { supabase } }) => {
    await supabase.auth.signOut()
    cookies.delete('svk-p-s-629542', { path: '/' });
    throw redirect(303, '/')
  },
  switchToAdmin: async ({ }) => {
    throw redirect(303, '/admin')
  },
  addTodo: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const todo = formData.get('todo');
    const due_date = new Date(formData.get('dueDate')).toISOString(); //date in utc time
    const link = formData.get('link');
    const course_id = formData.get('course');
    const assignment_type = formData.get('assignment_type');
    const publicOrPrivate = formData.get('publicOrPrivate');
    if (course_id === "None" && publicOrPrivate === "on") {
      return {
        message: 'You can not make a public assignment with no course chosen',
        success: false,
      }
    }

    if (publicOrPrivate === "on") {
      const { data, error: userDataInsertError } = await locals.supabase
        .from('canvas_assignments')
        .insert({ due_date, course_id: course_id === "None" ? null : course_id, text: todo, link, assignment_type })
      if (userDataInsertError != null) {
        console.error(userDataInsertError.message)
      }

    }
    else {
      const { data, error: userDataInsertError } = await locals.supabase
        .from('custom_todos')
        .insert({ user_id: userID, due_date, course_id: course_id === "None" ? null : course_id, text: todo, link, assignment_type })
      if (userDataInsertError != null) {
        console.error(userDataInsertError.message)
      }
    }
  },
  addClub: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const name = formData.get('name');
    const description = formData.get('description');
    const sponsor = formData.get('sponsor');
    const location = formData.get('location');
    const starting_time = formData.get('starting_time');
    const end_time = formData.get('end_time');
    const meeting_time = formData.get('meeting_time');
    const day_of_week = formData.get('day_of_week');
    const date_list = formData.get('date_list');
    const starting_in_two_weeks_or_one = formData.get('publicOrPrivate');
    const final_date = new Date(formData.get('final_date')); //date in utc time
    const school_id = formData.get('school_id');
    let dates;
    const currentDate = new Date(); // Current date
    if (meeting_time === "Weekly") {
      dates = getDaysOfWeek(currentDate, final_date, day_of_week);
    } else if (meeting_time === "Bi-Weekly") {
      dates = getDaysOfWeek(currentDate, final_date, day_of_week);
      if (starting_in_two_weeks_or_one === "on") {
        dates = dates.filter((d, i) => (i + 1) % 2 == 0) //remove every other date
      }
      else {
        dates = dates.filter((d, i) => (i + 1) % 2 == 1) //remove every other date
      }
    } else if (meeting_time === "Monthly") {
      dates = getFirstDayOfMonth(currentDate, final_date, day_of_week);
    } else {
      //other
      dates = date_list.split(",").map(date => new Date(date))
    }
    const list_of_dates = dates.map(date => date.toISOString().split("T")[0])
    const { error: clubError } = await locals.supabase
      .from('clubs')
      .insert({ sponsor, school_id, name, description, location, start_time: starting_time, end_time, dates: list_of_dates, is_approved: false })
    if (clubError != null) {
      console.error(clubError.message)
    }
  },
  deleteTodo: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const name = formData.get('if_custom');
    const assignment_id = formData.get('assignment_id');
    if (name === "custom") {
      const { error } = await locals.supabase
        .from('custom_todos')
        .delete()
        .eq('assignment_id', assignment_id)
      if (error != null) {
        console.error(error.message)
      }
    } else {
      const { error } = await locals.supabase
        .from('users_canvas_assignments')
        .delete()
        .eq('assignment_id', assignment_id)
        .eq('user_id', userID)
      if (error != null) {
        console.error(error.message)
      }
    }
  },
  updateTodo: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const description = formData.get('description');
    const name = formData.get('name');
    const assignment_id = formData.get('assignment_id');
    const due_date = new Date(formData.get('dueDate')).toISOString();
    const { error } = await locals.supabase
      .from('custom_todos')
      .update({ text: name, description, due_date })
      .eq('assignment_id', assignment_id)
  },
  seenGrades: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const courseID = formData.get('courseID');
    const grade_list = formData.get('grade_id_list');
    const { data: current_data, error: err1 } = await locals.supabase
      .from('users_in_courses')
      .select()
      .eq('user_id', userID)
      .eq('course_id', courseID)
    if (err1 != null) {
      console.error(err1.message)
    }
    let grade_id_list = current_data[0].grade_id_list.concat(grade_list.split(','))
    const { error } = await locals.supabase
      .from('users_in_courses')
      .update({ grade_id_list })
      .eq('user_id', userID)
      .eq('course_id', courseID)
    if (error != null) {
      console.error(error.message)
    }
  },
  seenAssignments: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const courseID = formData.get('courseID');
    const new_assignments = formData.get('new_assignments').split(",");
    const json_array = new_assignments.map(id => {
      return {
        assignment_id: id,
        user_id: userID
      };
    });
    
    const { error: error1 } = await locals.supabase
      .from('users_canvas_assignments')
      .insert(json_array)
    if (error1 != null) {
      console.error(error1.message)
    }
    const { error } = await locals.supabase
      .from('users_in_courses')
      .update({ last_sign_in_time: new Date().toISOString() })
      .eq('user_id', userID)
      .eq('course_id', courseID)
    if (error != null) {
      console.error(error.message)
    }
  },
  featureRequest: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const description = formData.get('description');
    const email = formData.get('email');
    const error_type = formData.get('error_type');
    const { error } = await locals.supabase
      .from('feature_requests')
      .insert({ description, email, error_type })
    if (error != null) {
      console.error(error.message)
    }
  },
  seenAllAssignments: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const new_assignments = formData.get('assignment_id_list').split(",");
    console.log(new_assignments)
    const json_array = new_assignments.map(id => {
      return {
        assignment_id: id,
        user_id: userID
      };
    });
    
    const { error: error1 } = await locals.supabase
      .from('users_canvas_assignments')
      .insert(json_array)
    if (error1 != null) {
      console.error(error1.message)
    }
    const { error } = await locals.supabase
      .from('users_in_courses')
      .update({ last_sign_in_time: new Date().toISOString() })
      .eq('user_id', userID)
    if (error != null) {
      console.error(error.message)
    }
  },
}
import { login } from '$lib';
import { fail, redirect } from '@sveltejs/kit'

export async function load({ url, locals: { supabase, getSession } }) {
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
  //grab courses the user is in
  const { data: user_in_course_data, error: courseError1 } = await supabase
    .from('users_in_courses')
    .select('*')
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
    user_in_course_data.filter(x => x.course_id === assignment.course_id)
    const last_sign_in_date = new Date(user_in_course_data[0].last_sign_in_time)
    const assignment_date = new Date(assignment.created_at)
    if (last_sign_in_date > assignment_date) {
      return undefined;
    } else {
      return assignment;
    }
  }).filter(value => value !== undefined);
  let current_assignments = course_todo_data.filter(value => user_assignments.includes(value.assignment_id));
  return {
    user_data: data[0],
    course_data,
    custom_todo_data,
    current_assignments,
    new_assignments,
  }
}
export const actions = {
  get_studentvue_data: async ({ locals }) => {
    const session = await locals.getSession()
    const userID = session.user.id
    const formData = locals.formData
    const student_id = formData.get('student_id');
    const student_password = formData.get('password');
    const district = formData.get('district');
    let client = await login(district, student_id, student_password);
    let grades = await client.getGradebook();
    let grades_json = JSON.parse(grades);
    if (!grades_json.Gradebook) {
      return {
        error: 'You did not input the correct password, please try again',
        success: false,
      }
    }
    let course_grades = grades_json.Gradebook.Courses.Course.map((course) => ({
      name: course.Title.replace(/\s+/g, ' '),
      grade: parseFloat(course.Marks.Mark[0].CalculatedScoreRaw)
    }));
    //get course info
    const { data: user_in_course_data, error: courseError1 } = await locals.supabase
      .from('users_in_courses')
      .select()
      .eq('user_id', userID);
    if (courseError1 != null) {
      console.error(courseError1.message)
    }
    //contains course ids
    const course_list = user_in_course_data.map(value => (value.course_id));
    const { data: course_data, error: courseError2 } = await locals.supabase
      .from('courses')
      .select()
      .in('course_id', course_list);
    if (courseError2 != null) {
      console.error(courseError2.message)
    }
    let courses_with_grades = course_grades.map(course1 => {
      const matchingCourse = course_data.find(course => course1.name === course.course_name);
      return matchingCourse ? { "grade": course1.grade, ...matchingCourse } : null;
    }).filter(Boolean);
    //calculate gpa
    courses_with_grades.map(course => {
      let grade_offset = 0;
      if (course.type_of_class === "AP") {
        grade_offset = 1.0;
      }
      else if (course.type_of_class === "HON") {
        grade_offset = 0.5;
      }
      let gpa = 0;
      if (Math.round(course.grade) >= 97) {
        gpa = 4.5;
      }
      else if (Math.round(course.grade) >= 90) {
        gpa = 4;
      }
      else if (Math.round(course.grade) >= 86) {
        gpa = 3.5;
      }
      else if (Math.round(course.grade) >= 80) {
        gpa = 3;
      }
      else if (Math.round(course.grade) >= 76) {
        gpa = 2.5;
      }
      else if (Math.round(course.grade) >= 70) {
        gpa = 2;
      }
      else if (Math.round(course.grade) >= 66) {
        gpa = 1.5;
      }
      else if (Math.round(course.grade) >= 60) {
        gpa = 1;
      }
      gpa += grade_offset;
      console.log(gpa)
    })
    return {
      full_grades: grades_json.Gradebook.Courses.Course,
      grades: course_grades,
      success: true,
    }
  },
}
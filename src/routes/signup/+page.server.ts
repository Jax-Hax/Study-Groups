import { login } from "$lib";
import { redirect } from "@sveltejs/kit";

export async function load({ url, locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        throw redirect(302, '/')
    }
    const { data: schoolData, error: userDataError } = await supabase
        .from('schools')
        .select()
    if (userDataError != null) {
        console.error(userDataError.message)
    }
    return { schoolData }
}
export const actions = {
    signout: async ({ cookies, locals: { supabase } }) => {
        await supabase.auth.signOut()
        cookies.delete('svk-p-s-629542', {path: '/'});
        throw redirect(303, '/')
    },
    import: async ({ locals }) => {
        const formData = locals.formData
        const student_id = formData.get('student_id')
        const student_password = formData.get('student_password')
        const district = formData.get('school_ids')
        const session = await locals.getSession()
        const userID = session.user.id
        const { data: schoolData, error: schoolError } = await locals.supabase
            .from('schools')
            .select()
            .eq('school_id', district);
        if (schoolError != null) {
            console.error(schoolError.message)
        }
        let client = await login(schoolData[0].school_studentvue_url, student_id, student_password);
        let grades = await client.getGradebook();
        let grades_json = JSON.parse(grades);
        if (!grades_json.Gradebook) {
            return {
                message: 'You did not input a valid id or password, please try again',
                success: false,
            }
        }
        const { data: isMultipleUsers, error: DataError } = await locals.supabase
            .from('user_data')
            .select()
            .eq('student_number', student_id);
        if (DataError != null) {
            console.error(DataError.message)
        }
        if (isMultipleUsers.length > 0) {
            return {
                message: 'An account already exists with that student number',
                success: false,
            }
        }
        const { data: userData, error: userDataError } = await locals.supabase
            .from('user_data')
            .select('*')
            .eq('user_id', userID);
        if (userDataError != null) {
            console.error(userDataError.message)
        }
        if (userData.length <= 0) {
            const { error: userDataInsertError } = await locals.supabase
                .from('user_data')
                .insert({ user_id: userID, student_number: student_id, school_id: district })
            if (userDataInsertError != null) {
                console.error(userDataInsertError.message)
            }
        }

        let courseOptions = grades_json.Gradebook.Courses.Course.map((course) => course.Title.replace(/\s+/g, ' ')); //removes whitespace
        const { data, error } = await locals.supabase
            .from('courses')
            .select()
            .eq('school_id', district)
            .in('course_name', courseOptions)
        if (error != null) {
            console.error(error.message)
        }
        let courseNameData = data.map((course) => course.course_name);
        return {
            courseOptions,
            courseNameData,
            courseData: data,
            success: true,
            school_id: district
        }
    },
    addCourses: async ({ locals }) => {
        const session = await locals.getSession()
        const userID = session.user.id
        const formData = locals.formData
        const course_list_data = JSON.parse(formData.get('selectedCoursesList'))
        const school_id = formData.get('school_id')
        let course_list_with_UID = [];
        for await (const course of course_list_data) {
            if (course.course_id === "NA") {
                //not made yet
                const { data, error1 } = await locals.supabase
                    .from('courses')
                    .insert({num_students: 1, course_name: course.course_name, type_of_class: course.course_level, school_id, moderator_id: userID})
                    .select()
                if (error1 != null) {
                    console.error(error1)
                }
                let user_in_course = { user_id: userID, course_id: data[0].course_id, hex: course.hex, grade_id_list: [] }
                course_list_with_UID.push(user_in_course);
                console.log(course_list_with_UID)
            }
            else {
                //already a course
                course_list_with_UID.push({ user_id: userID, course_id: course.course_id, hex: course.hex, grade_id_list: [] });
            }
        }
        console.log("course list: " + course_list_with_UID)
        const { error } = await locals.supabase
            .from('users_in_courses')
            .insert(course_list_with_UID)
        if (error != null) {
            console.error(error)
        }
        throw redirect(302, '/dashboard');
    },
    seenGrades: async ({ locals }) => {
        const session = await locals.getSession()
        const userID = session.user.id
        const formData = locals.formData
        const course_id = formData.get('courseID')
        const { error } = await locals.supabase
            .from('users_in_courses')
            .update(course_list_with_UID)
            .eq('user_id', userID)
            .eq('course_id', course_id)
        if (error != null) {
            console.error(error)
        }
    },
}

import { login } from "$lib";
import { redirect } from "@sveltejs/kit";

export async function load({ url, locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        throw redirect(302, '/')
    }
    const userID = session.user.id
    //grab players data from supabase
    const { data, error } = await supabase
        .from('user_data')
        .select('student_number')
        .eq('user_id', userID);
    if (error != null) {
        console.error(error.message)
    }
    if (data.length > 0) {
        throw redirect(302, `/dashboard`)
    }
}
export const actions = {
    signout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut()
        throw redirect(303, '/')
    },
    import: async ({ locals }) => {
        const formData = locals.formData
        const student_id = formData.get('student_id')
        const student_password = formData.get('student_password')
        const district = formData.get('district')
        let client = await login(district, student_id, student_password);
        let grades = await client.getGradebook();
        let grades_json = JSON.parse(grades);
        if (!grades_json.Gradebook) {
            return {
                message: 'You did not input a valid id or password, please try again',
                success: false,
            }
        }
        let courseOptions = grades_json.Gradebook.Courses.Course.map((course) => course.Title.replace(/\s+/g, ' ')); //removes whitespace
        const { data, error } = await locals.supabase
            .from('courses')
            .select('course_name')
            .in('course_name', courseOptions)
            .select('*')
        if (error != null) {
            console.error(error.message)
        }
        let courseNameData = data.map((course) => course.course_name);
        return {
            courseOptions,
            courseNameData,
            courseData: data,
            success: true
        }
    },
    addCourses: async ({ locals }) => {
        const session = await locals.getSession()
        const userID = session.user.id
        const formData = locals.formData
        const course_list_data = formData.get('selectedCoursesList')
        const course_list = course_list_data.split(",");
        const course_list_with_UID = course_list.map(value => ({ user_id: userID, course_id: value }));
        const { error } = await locals.supabase
            .from('users_in_courses')
            .insert(course_list_with_UID)
        if (error != null) {
            console.error(error)
        }
    },
}

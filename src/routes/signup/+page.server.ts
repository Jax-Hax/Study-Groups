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
    signout: async ({ locals: { supabase, getSession } }) => {
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
        let courseOptions = grades_json.Gradebook.Courses.Course.map((course) => course.Title);
        const { courseData, error } = await locals.supabase
            .from('courses')
            .select('course_name')
            .in('course_name', courseOptions);
        if (error != null) {
            console.error(error.message)
        }
        return {
            courseOptions,
            courseData,
            success: true
        }
    },
}

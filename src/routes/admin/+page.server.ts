import { login, getDaysOfWeek, getFirstDayOfMonth } from '$lib';
import { fail, redirect } from '@sveltejs/kit'

export async function load({ url, locals }) {
    const session = await locals.getSession()
    if (!session) {
        throw redirect(302, '/')
    }
    const userID = session.user.id
    //get classes you are the mod of
    const { data: course_data, error: courseError2 } = await locals.supabase
        .from('courses')
        .select()
        .eq('moderator_id', userID);
    if (courseError2 != null) {
        console.error(courseError2.message)
    }
    const course_list = course_data.map(value => (value.course_id));
    const { data: course_todo_data, error: courseError4 } = await locals.supabase
        .from('canvas_assignments')
        .select()
        .in('course_id', course_list);
    if (courseError4 != null) {
        console.error(courseError4.message)
    }
    console.log(course_todo_data)
    return { course_data }
}
export const actions = {
    signout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut()
        throw redirect(303, '/')
    },
    switchToSchool: async ({ }) => {
        throw redirect(303, '/dashboard')
    },
}
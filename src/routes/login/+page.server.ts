import { encryptPassword } from "$lib";
import { redirect } from "@sveltejs/kit";

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
    if (cookies.get("svk-p-s-629542")) {
        throw redirect(303, '/dashboard')
    }
    return {
        user_data: data[0],
    }
}
export const actions = {
    signout: async ({ cookies, locals: { supabase } }) => {
        await supabase.auth.signOut()
        cookies.delete('svk-p-s-629542', {path: '/'});
        throw redirect(303, '/')
    },
    get_studentvue_data: async ({ locals, cookies }) => {
        const session = await locals.getSession()
        const userID = session.user.id
        const grades_json = await locals.getGrades();
        if (!grades_json.Gradebook) {
            return {
                error: 'You did not input the correct password, please try again',
                success: false,
            }
        }
        const formData = locals.formData
        const student_password = formData.get('studentvue_password_for_auth');
        cookies.set('svk-p-s-629542', encryptPassword(student_password), {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/',
        })
        throw redirect(303, '/dashboard')
    },
}
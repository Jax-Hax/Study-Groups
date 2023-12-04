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
        .select('*')
        .eq('user_id', userID);
    if (error != null) {
        console.error(error.message)
    }
    if (data.length <= 0) {
        //user needs to do the signup process
        throw redirect(302, `/signup`)
    }
    return {
        user_data: data[0],
    }
}
export const actions = {
    signout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut()
        throw redirect(303, '/')
    },
}
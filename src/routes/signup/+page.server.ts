import { redirect } from "@sveltejs/kit";

export async function load({ url, locals: { supabase, getSession }}) {
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
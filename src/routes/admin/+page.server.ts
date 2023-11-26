import { login, getDaysOfWeek, getFirstDayOfMonth } from '$lib';
import { fail, redirect } from '@sveltejs/kit'

export async function load({ url, locals: { supabase, getSession } }) {
  const session = await getSession()
  if (!session) {
    throw redirect(302, '/')
  }
  const userID = session.user.id
  return {userID}
}
export const actions = {
    signout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut()
        throw redirect(303, '/')
      },
      switchToSchool: async ({  }) => {
        throw redirect(303, '/dashboard')
      }, 
}
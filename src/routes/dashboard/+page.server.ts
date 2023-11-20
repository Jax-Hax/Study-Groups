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
  return {
    user_data: data[0],
    course_data,
    custom_todo_data,
    course_todo_data
  }
}
export const actions = {
  signup: async ({ url, locals }) => {
    const formData = locals.formData
    const email = formData.get('email')
    const password = formData.get('password')
    if (password != formData.get('confirmPassword')) {
      return fail(422, { message: 'Your passwords do not match', success: false })
    }
    const { error } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/confirm`,
      },
    })

    if (error) {
      console.log(error)
      return fail(422, { message: error.message, success: false, email })
    }

    return {
      message: 'Please check your email for a confirmation email to log into the website. If you do not get one, try logging in, as you might already have an account with that email.',
      success: true,
    }
  },
  login: async ({ locals }) => {
    const formData = locals.formData
    const email = formData.get('email')
    const password = formData.get('password')

    const { error } = await locals.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log(error)
      return fail(422, { message: error.message, success: false, email })
    }

    throw redirect(302, `/auth/confirm`)
  },
}
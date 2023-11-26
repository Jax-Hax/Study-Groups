import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { login } from '$lib'
import { createServerClient } from '@supabase/ssr'
import type { Handle, HandleFetch } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  //FOR SUPABASE AUTH
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options)
      },
      remove: (key, options) => {
        event.cookies.delete(key, options)
      },
    },
  })

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }
  //for form actions for logging in with studentvue
  if (event.request.method === 'POST') {
    // get the form data from the request
    const formData = await event.request.formData()
    event.locals.formData = formData
    
    if (formData.get('studentvue_password_for_auth')) {
      const student_id = formData.get('student_id_for_auth');
      const student_password = formData.get('studentvue_password_for_auth');
      const district = formData.get('district_for_auth');
      const { data: schoolData, error: schoolError } = await event.locals.supabase
      .from('schools')
      .select()
      .eq('school_id', district);
        if (schoolError != null) {
            console.error(schoolError.message)
        }
      let client = await login(schoolData[0].school_studentvue_url, student_id, student_password);
      event.locals.getGrades = async () => {
        let grades_return = await client.getGradebook();
        let grades_json = JSON.parse(grades_return);
        return grades_json
      }
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
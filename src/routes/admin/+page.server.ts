import { login, getDaysOfWeek, getFirstDayOfMonth } from '$lib';
import { fail, redirect } from '@sveltejs/kit'
export async function load({ url, locals, cookies }) {
    const session = await locals.getSession()
    if (!session) {
        throw redirect(302, '/')
    }
    async function generateRSAKeyPair() {
        const keyPair = await crypto.subtle.generateKey(
          {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
            hash: { name: "SHA-256" },
          },
          true,
          ["encrypt", "decrypt"]
        );
        return keyPair;
      }
      
      const keyPair = await generateRSAKeyPair();
    let publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    let privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
    function storeKeysInLocalStorage(publicKey, privateKey) {
        const publicKeyBytes = new Uint8Array(publicKey);
        const privateKeyBytes = new Uint8Array(privateKey);
      
        console.log(JSON.stringify(publicKeyBytes));
        console.log(JSON.stringify(privateKeyBytes));
      }
      storeKeysInLocalStorage(publicKey,privateKey)
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
    let new_assignments = course_todo_data.map((assignment) => {
        let date = course_data.filter(x => x.course_id === assignment.course_id)
        const last_sign_in_date = new Date(date[0].moderator_last_approval_time)
        const assignment_date = new Date(assignment.created_at)
        if (last_sign_in_date > assignment_date) {
          return undefined;
        } else {
          return assignment;
        }
      }).filter(value => value !== undefined);
    // Add 'assignment_list' parameter to each course
    course_data.forEach(course => {
    course.assignment_list = [];
  });
  
  // Loop through the assignments and associate them with courses
  new_assignments.forEach(assignment => {
    const courseIndex = course_data.findIndex(course => course.course_id === assignment.course_id);
    if (courseIndex !== -1) {
        course_data[courseIndex].assignment_list.push(assignment);
    }
  });
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
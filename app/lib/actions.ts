'use server'

import { redirect } from 'next/navigation';
import { users } from '../lib/credentials';

export async function authenticate(formData: FormData) {
    try {
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            redirect(`/dashboard/${username}/home`);
        } else {
            console.log("Invalid Login");
            return 'Invalid credentials'; // Return a specific message for invalid login
        }
    } catch (error) {
        console.log("Something went wrong:", error);
        throw error; // Optionally rethrow the error if you want it to propagate further
    }
}

export async function signOut() {
    redirect('/login');
}


// 'use server'
 
// import { signIn } from "next-auth/react"
 
// export async function authenticate(_currentState: unknown, formData: FormData) {
//   try {
//     await signIn('credentials', formData)
//   } catch (error) {
//     if (error) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.'
//         default:
//           return 'Something went wrong.'
//       }
//     }
//     throw error
//   }
// }
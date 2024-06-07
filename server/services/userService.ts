// import sequelize from "@/lib/sequelize";
import User from "@/lib/models/User";
import sequelize from "@/lib/sequelize";
import { Op } from "sequelize";
import { z } from "zod";
import { authCookie, userCookie } from "./cookies";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export const userService = {
  authenticate,
  // signOut
};

async function matchCreds(username: string, password: string) {
  try {
    sequelize
    const user = await User.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`
        },
      }
    })
    if (password !== user?.getDataValue('password')) return null
    userCookie(username)

    return {
      username: user?.getDataValue('username'),
      firstName: user?.getDataValue('firstName'),
      lastName: user?.getDataValue('lastName'),
    }
  } catch(err) {
    console.error("INVALID CREDS", err)
    return null;
  }
}

async function authenticate(username: string, password: string) {
  authCookie(false)
  const raw_creds = z
    .object({username: z.string().regex(/^\w+$/), password: z.string().regex(/^\w+$/)})
    .safeParse({username, password})

  if (raw_creds.success) {
    const {username, password} = raw_creds.data
    
    const parsed_creds = matchCreds(username, password)
    authCookie(true)
    // console.log("MATCH CREDS: " + parsed_creds)
    return parsed_creds;
  }
  console.log("AUTH FAIL")
  return null;
}

export async function signOut() {
  authCookie(false)
  cookies().delete('user_id')
  redirect('/login')
  // useRouter().push('/login')
}
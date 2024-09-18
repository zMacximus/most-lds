// import sequelize from "@/lib/sequelize";
import User from "@/lib/models/User";
import db from "@/lib/sequelize";
import { Op } from "sequelize";
import { z } from "zod";
import { adminCookie, authCookie, userCookie } from "./cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserPassword } from "@/lib/definitions";
import bcrypt from "bcrypt";

export const userService = {
  authenticate,
  // signOut
};

async function matchCreds(username: string, password: string) {
  try {
    db;
    const user = await User.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    });

    if (!user) {
      // If user doesn't exist, return null
      console.error("User not found");
      return null;
    }

    const hashedPassword = user.getDataValue("password"); // Get the stored hashed password

    // Compare the provided plain password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      // If the passwords don't match, return null
      console.error("Passwords don't match");
      return null;
    }

    // If passwords match, set the cookies and return user info
    userCookie(username);
    adminCookie(user.getDataValue("admin"));

    return {
      username: user.getDataValue("username"),
      firstName: user.getDataValue("firstName"),
      lastName: user.getDataValue("lastName"),
    };
  } catch (err) {
    console.error("Error authenticating user:", err);
    return null;
  }
}

async function authenticate(username: string, password: string) {
  authCookie(false);
  const raw_creds = z
    .object({
      username: z.string().regex(/^\w+$/),
      password: z.string().regex(/^\w+$/),
    })
    .safeParse({ username, password });

  if (raw_creds.success) {
    const { username, password } = raw_creds.data;

    const parsed_creds = matchCreds(username, password);
    authCookie(true);
    // console.log("MATCH CREDS: " + parsed_creds)
    return parsed_creds;
  }
  console.log("AUTH FAIL");
  return null;
}

export async function signOut() {
  authCookie(false);
  cookies().delete("user_id");

  cookies().delete("admin");
  redirect("/login");
  // useRouter().push('/login')
}

// export async function isUserAdmin(user: string) {

//   return false;
// }

"use server";

import { UserType, findUserData } from "@/lib/models/User";
import { getUserCookie } from "./services/cookies";

export async function getUserData(user_id: string) {
  //   const user_data = user_id;
  const user_data = await findUserData(user_id).then((data) => {
    return data;
  });

  return user_data;
}

"use server";

import { UserType, findUserData } from "@/lib/models/User";
import { getUserCookie } from "./services/cookies";
import { getCompletedTrainings } from "@/lib/models/EnrolledTrainings";

export async function getUserData(user_id: string) {
  //   const user_data = user_id;
  const user_data = await findUserData(user_id).then((data) => {
    return data;
  });

  return user_data;
}

export async function getCompletedTrainingData(user_id?: string) {
  const dbData = await getCompletedTrainings(
    user_id ? user_id : getUserCookie()!
  ).then((data) => {
    return data;
  });

  // console.log(dbData);
  return dbData;
}

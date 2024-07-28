"use server";

import Profile from "@/components/profile/profile";
import SmallCourse from "@/components/profile/course-small";
import { Spacer } from "@nextui-org/react";
import CourseDropDown from "@/components/profile/course-drop-downs";
import { findUserData, UserType } from "@/lib/models/User";
import { getUserCookie } from "@/server/services/cookies";

export default async function Page() {
  const userCookie = getUserCookie();
  const user_data: UserType | null = userCookie
    ? await findUserData(userCookie)
    : null;

  if (!user_data) {
    // Handle the case where user data is not found
    return (
      <div className='flex flex-col border-solid border- border-black'>
        <div>User data not found.</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col border-solid border- border-black'>
      <Profile data={user_data}></Profile>
      <Spacer y={5} />
      {/* <div className='flex flex-col py-2 px-5 w-full h-full bg-white rounded-3xl drop-shadow-md'>
        <CourseDropDown props={{ key: "ongoing", title: "Ongoing Trainings" }}>
          <SmallCourse></SmallCourse>
        </CourseDropDown>
      </div>
      <Spacer y={5} /> */}
      <div className='flex flex-col py-2 px-5 w-full h-full bg-white rounded-3xl drop-shadow-md'>
        <CourseDropDown
          props={{ key: "completed", title: "Completed Trainings" }}
        >
          <SmallCourse></SmallCourse>
        </CourseDropDown>
      </div>
    </div>
  );
}

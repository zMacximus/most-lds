"use client";

import { useEffect, useState } from "react";
import Profile from "@/components/profile/profile";
import SmallCourse from "@/components/profile/course-small";
import { Spacer } from "@nextui-org/react";
import CourseDropDown from "@/components/profile/course-drop-downs";
import { UserType } from "@/lib/models/User";
import { useSearchParams } from "next/navigation";
import { getUserData } from "@/server/actions";

export default function Page() {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id");

  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      getUserData(user_id).then((data) => {
        setUserData(data);
        setLoading(false);
      });
    }
  }, [user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <div className='flex flex-col border-solid border- border-black'>
        <div>User data not found.</div>
      </div>
    );
  }

  // console.log(user_id);
  return (
    <div className='flex flex-col border-solid border- border-black'>
      <Profile data={userData}></Profile>
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
          <SmallCourse user_id={user_id!}></SmallCourse>
        </CourseDropDown>
      </div>
    </div>
  );
}

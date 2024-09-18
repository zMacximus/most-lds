"use client";

import { useEffect, useState } from "react";
import Profile from "@/components/profile/profile";
import SmallCourse from "@/components/profile/course-small";
import { Spacer } from "@nextui-org/react";
import CourseDropDown from "@/components/profile/course-drop-downs";
import { UserType } from "@/lib/models/User";
import { useSearchParams } from "next/navigation";
import { getUserData } from "@/server/actions";
import {
  getAllUserTrainings,
  UserTrainingType,
} from "@/lib/models/UserTraining";
import UserTrainingItem from "@/components/trainings/user-training-item";
import UserTrainingsTable from "@/components/trainings/user-trainings-table";
import ClientProfile from "./client-profile";

export default function AdminProfileViewer({
  //   searchParams2,
  children,
}: {
  //   searchParams2?: {
  //     query?: string;
  //     page?: string;
  //   };
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  //   const query = searchParams2?.query || "";
  //   const currentPage = Number(searchParams2?.page) || 1;

  const user_id = searchParams.get("user_id");

  const [userData, setUserData] = useState<UserType | null>(null);
  //   const [userTrainingData, setUserTrainings] = useState<
  //     UserTrainingType[] | null
  //   >(null);
  //   const [dataSlice, setDataForPage] = useState<UserTrainingType[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      getUserData(user_id).then((data) => {
        setUserData(data);
      });

      //   getAllUserTrainings(user_id).then((data) => {
      //     setUserTrainings(data);
      //   });

      //   if (userTrainingData) {
      //     const startIndex = (currentPage - 1) * 5;
      //     const endIndex = startIndex + 5;
      //     setDataForPage(userTrainingData.slice(startIndex, endIndex));
      //   }

      setLoading(false);
    }
  }, [user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // function getDataForPage(pageNumber: number, data: UserTrainingType[]) {
  //   const startIndex = (pageNumber - 1) * 5;
  //   const endIndex = startIndex + 5;
  //   return data.slice(startIndex, endIndex);
  // }

  if (!userData) {
    return (
      <div className="flex flex-col border-solid border- border-black">
        <div>User data not found.</div>
      </div>
    );
  }

  // console.log(user_id);
  return (
    <div className="flex flex-col border-solid border- border-black">
      <ClientProfile data={userData}></ClientProfile>
      <Spacer y={5} />
      {/* <div className='flex flex-col py-2 px-5 w-full h-full bg-white rounded-3xl drop-shadow-md'>
        <CourseDropDown props={{ key: "ongoing", title: "Ongoing Trainings" }}>
          <SmallCourse></SmallCourse>
        </CourseDropDown>
      </div>
      <Spacer y={5} /> */}
      {/* <div className='flex flex-col py-2 px-5 w-full h-full bg-white rounded-3xl drop-shadow-md'>
        <CourseDropDown
          props={{ key: "completed", title: "Completed Trainings" }}
        >
          <SmallCourse user_id={user_id!}></SmallCourse>
        </CourseDropDown>
      </div> */}
      <div className="flex flex-col py-2 px-5 w-full h-full bg-white rounded-3xl drop-shadow-md">
        <CourseDropDown props={{ key: "completed", title: "Trainings" }}>
          {/* {userTrainingData != null ? ( */}
          {children}
          {/* <UserTrainingsTable
            tableHeaders={["Training", "Date of Completion", "Actions"]}
            dbData={userTrainingData!}
            currentPage={currentPage}
          >
            <UserTrainingItem dbData={dataSlice!}></UserTrainingItem>
          </UserTrainingsTable> */}
          {/* ) : (
            <p>NO DATA</p>
          )} */}
        </CourseDropDown>
      </div>
    </div>
  );
}

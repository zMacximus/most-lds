"use server";
import CourseCard from "@/components/trainings/course-card";
import { getAllTrainings, TrainingType } from "@/lib/models/Training";
import { getUserCookie } from "@/server/services/cookies";
import { Spacer } from "@nextui-org/react";

export default async function Page() {
  const dbData = await getAllTrainings();
  const user_id = getUserCookie();
  return (
    <div className='flex flex-col w-auto h-auto drop-shadow-md border-solid border- border-black bg-white rounded-2xl'>
      <div className='flex flex-row'>
        <p className='text-[1.5rem] ml-5 mt-4'>Trainings</p>
      </div>
      {/* <Spacer y={1}></Spacer> */}
      <Spacer x={5}></Spacer>
      <div className='flex flex-row border-solid border- border-blue-400 px-5 mb-4 flex-wrap -mt-2 -mr-2'>
        <CourseCard dbData={dbData!} user_id={user_id!}></CourseCard>
      </div>
    </div>
  );
}

"use server";
import CourseCard from "@/components/trainings/course-card";
import { getAllTrainings, TrainingType } from "@/lib/models/Training";

export default async function Page() {
  const dbData = await getAllTrainings();
  return (
    <div className='flex flex-col w-auto h-auto drop-shadow-md border-solid border- border-black bg-white rounded-2xl'>
      <div className='flex flex-row'>
        <p className='text-[1.5rem] ml-5 mt-2'>Your Trainings</p>
      </div>
      <div className='flex flex-row border-solid border- border-blue-400 px-5 mb-4 flex-wrap -mt-2'>
        <CourseCard dbData={dbData!}></CourseCard>
      </div>
    </div>
  );
}

//@ts-nocheck
"use server";
import Image from "next/image";
import placeholderCourse from "public/placeholder/Placeholder-Man.jpg";

import { CircularProgress } from "@nextui-org/progress";
import { Spacer } from "@nextui-org/react";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { getCompletedTrainings } from "@/lib/models/EnrolledTrainings";
import { getUserCookie } from "@/server/services/cookies";

export default async function SmallCourse() {
  // const value = 50;
  const dbData = await getCompletedTrainings(getUserCookie()!);
  console.log(dbData);
  return (
    <div className='flex flex-row mx-3 mb-3 overflow-x-scroll'>
      {dbData.map((data, index) => {
        return (
          <>
            <div className='flex-none w-[50vh]' key={data.id + data.title}>
              <div className='flex flex-row items-center min-w-[380px] max-w-[380px] min-h-[100px] max-h-[100px] bg-white border-solid border-2 border-gray-400 overflow-hidden mt-2 mr-2'>
                <div className='overflow-hidden relative max-w-[150px] max-h-[150px]'>
                  <Image
                    src={data.image ? data.image : placeholderCourse}
                    width={150}
                    height={150}
                    alt='Course Image'
                    className='w-full h-full object-cover'
                  />
                </div>

                <div className='flex flex-col'>
                  <p className='text-lg font-semibold text-clip mx-2'>
                    {data.title}
                  </p>
                  <p className='text-medium text-gray-600 text-clip mx-2'>
                    {data.code}
                  </p>
                </div>
                {/* <p className="text-lg px-3">66%</p> */}
                <div className='rounded-full bg-primary-200 mx-3'>
                  <CheckCircleIcon
                    width={35}
                    color='primary'
                    className='text-lg text-primary'
                  ></CheckCircleIcon>
                </div>
              </div>
            </div>
            {index < dbData.length - 1 && <Spacer x={5} />}
          </>
        );
      })}
    </div>
  );
}

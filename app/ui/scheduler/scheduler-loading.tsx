"use client";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import { SCHEDULER_DATA } from "@/lib/mock_data";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";

export default function SchedulerLoading() {
  return (
    <>
      {/* <Suspense> */}
      <div className='flex flex-col mb-2.5 justify-center items-center overflow-hidden pb-[56.25%] pt-[25px] h-0 relative'>
        <div className='w-full h-full absolute top-0 left-0'>
          <div className='flex flex-row h-full w-full justify-center items-center text-3xl'>
            Initializing Scheduler...
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </>
  );
}

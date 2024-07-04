"use client";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { SCHEDULER_DATA } from "@/lib/mock_data";
import { Skeleton } from "@nextui-org/react";

export default function HomeScheduler() {
  return (
    // <div className='flex flex-grow-1 w-full h-full border-solid border-1 border-gray-300  m-1'>
    // <Skeleton
    //   isLoaded={true}
    //   className='relative w-[auto] min-h-[530px] max-h-[530px] mx-5 mt-2 border-1.5 border-solid border-gray-400'
    // >
    <>
      <div className='flex flex-col mb-2.5 justify-center items-center overflow-hidden pb-[56.25%] pt-[25px] h-0 relative'>
        <div className='w-full h-full absolute top-0 left-0'>
          <Scheduler
            isLoading
            data={SCHEDULER_DATA}
            config={{
              zoom: 1,
              filterButtonState: -1,
              includeTakenHoursOnWeekendsInDayView: false,
              maxRecordsPerPage: 5,
            }}
          ></Scheduler>
        </div>
      </div>
    </>
    // </Skeleton>
  );
}

"use client";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import { SCHEDULER_DATA } from "@/lib/mock_data";
import { Skeleton } from "@nextui-org/react";
import { Suspense, useEffect } from "react";
import SchedulerLoading from "../scheduler/scheduler-loading";

export default function HomeScheduler({ data }: { data?: SchedulerData }) {
  // useEffect(() => {
  //   window.alert("window.alert from client component");
  // }, []);

  return (
    <>
      <Suspense fallback={<SchedulerLoading />}>
        <div className='flex flex-col mb-2.5 justify-center items-center overflow-hidden pb-[56.25%] pt-[25px] h-0 relative'>
          <div className='w-full h-full absolute top-0 left-0'>
            <Scheduler
              isLoading
              data={data ? data : []}
              config={{
                zoom: 0,
                filterButtonState: -1,
                includeTakenHoursOnWeekendsInDayView: false,
                maxRecordsPerPage: 5,
              }}
            ></Scheduler>
          </div>
        </div>
      </Suspense>
    </>
  );
}

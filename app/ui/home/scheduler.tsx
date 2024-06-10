"use client";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { SCHEDULER_DATA } from "@/lib/mock_data";

export default function HomeScheduler() {
  return (
    // <div className='flex flex-grow-1 w-full h-full border-solid border-1 border-gray-300  m-1'>
    <div className='relative w-[auto] min-h-[530px] max-h-[530px] mx-5 mt-2 border-1.5 border-solid border-gray-400'>
      <Scheduler
        data={SCHEDULER_DATA}
        config={{
          zoom: 1,
          filterButtonState: -1,
          includeTakenHoursOnWeekendsInDayView: false,
          maxRecordsPerPage: 5,
        }}
      ></Scheduler>
    </div>
  );
}

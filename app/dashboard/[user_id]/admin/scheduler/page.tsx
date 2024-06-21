"use client";

import HomeScheduler from "@/components/home/scheduler";
import { Spacer } from "@nextui-org/react";

// import { Scheduler } from "@bitnoi.se/react-scheduler"
// import { ADMIN_SCHEDULER } from "lib/mock_data"

export default function Page() {
  return (
    <div className='h-full border-solid rounded-3xl drop-shadow-md border- border-gray-400 relative overflow-hidden bg-white'>
      <Spacer y={5}></Spacer>
      <div className='text-[1.5rem] ml-5'>Admin Scheduler</div>
      <HomeScheduler></HomeScheduler>
    </div>
  );
}

"use server";

import HomeScheduler from "@/components/home/scheduler";
import SchedulerItem from "@/components/scheduler/scheduler-item";
import SchedulerLoading from "@/components/scheduler/scheduler-loading";
import ScheduleTable from "@/components/scheduler/shceduler-table";
import SearchBar from "@/components/searchbar";
import {
  formatScheduleData,
  getAllSchedule,
  getAllUserSchedule,
} from "@/lib/models/Schedule";
import { getAllTrainings } from "@/lib/models/Training";
import { getUserCookie } from "@/server/services/cookies";
import { SchedulerData } from "@bitnoi.se/react-scheduler";
import { Skeleton, Spacer } from "@nextui-org/react";
import { Suspense } from "react";

// import { Scheduler } from "@bitnoi.se/react-scheduler"
// import { ADMIN_SCHEDULER } from "lib/mock_data"

export default async function Page() {
  const headers = ["Training", "Start Date", "End Date", "Actions"];

  const user_id = getUserCookie();

  const dbData = await getAllUserSchedule(user_id!);
  const fieldData = await getAllTrainings();
  const schedulerData = await formatScheduleData(user_id!);

  return (
    <div>
      <ScheduleTable
        tableHeaders={headers}
        dbData={dbData}
        currentPage={0}
        fieldData={fieldData!}
      >
        <SchedulerItem dbData={dbData} fieldData={fieldData!}></SchedulerItem>
      </ScheduleTable>
      <Spacer y={5}></Spacer>
      <div className="h-full border-solid rounded-3xl drop-shadow-md border- border-gray-400 relative overflow-hidden bg-white">
        <Spacer y={5}></Spacer>
        <div className="text-[1.5rem] ml-5">Scheduler</div>
        <HomeScheduler data={schedulerData}></HomeScheduler>
      </div>
    </div>
  );
}

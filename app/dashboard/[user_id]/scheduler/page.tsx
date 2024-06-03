"use client"

import { Scheduler } from "@bitnoi.se/react-scheduler"
import { ADMIN_SCHEDULER } from "lib/mock_data"

export default function Page()
{
    return (
        <div className="h-[37rem] border-solid border-2 border-gray-200 m-1 relative overflow-hidden">
            <Scheduler data={ADMIN_SCHEDULER}
                config={{zoom: 1, filterButtonState: -1, includeTakenHoursOnWeekendsInDayView: false, maxRecordsPerPage: 5}}>
            </Scheduler>
        </div>
    )
}
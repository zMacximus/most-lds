'use client'

import Image from "next/image";
import placeholderMan from "../../../../public/placeholder/Placeholder-Man.jpg"
import Upcoming from "ui/home/upcoming";
import { Avatar } from "@nextui-org/react";
import { Scheduler, } from "@bitnoi.se/react-scheduler";

import {SCHEDULER_DATA} from "lib/mock_data"

export default function Page()
{
    return (
        <div className="flex flex-col border-solid border- border-black rounded-xl bg-white">
            <div className="flex flex-row">
                <div className="flex flex-col border-solid border- border-gray-300 w-full m-1">
                    <div className="flex flex-row justify-start items-center m-1">
                        <Avatar src={placeholderMan.src} name="Henry" className="mr-2"></Avatar>
                        <p className="text-[1.5rem]">Welcome back, Henry</p>
                    </div>
                    <div className="relative w-full h-full border-solid border-1 border-gray-300 m-1">
                        <Scheduler data={SCHEDULER_DATA}
                        config={{zoom: 1, filterButtonState: -1, includeTakenHoursOnWeekendsInDayView: false, maxRecordsPerPage: 5}}>
                        </Scheduler>
                    </div>
                </div>
                <div className="flex flex-col max-w-full max-h-[38rem] overflow-y-scroll border-solid border- border-gray-300 m-1">
                    <div className="text-[1.5rem] ml-2 my-1">Upcoming</div>
                    <Upcoming />
                </div>
            </div>
        </div>
    )
}
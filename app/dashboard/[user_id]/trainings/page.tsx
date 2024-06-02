import Image from "next/image";
import placeholderMan from "../../../../public/Placeholder-Man.jpg"
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Divider } from "@nextui-org/react";
import CourseCard from "ui/trainings/course-card";

export default function Page()
{
    return (
        <div className="flex flex-col border-solid border- border-black bg-white rounded-2xl">
            <div className="text-[2em] p-3">Your Trainings</div>
            <div className="flex flex-row border-solid border- border-blue-400 p-5 flex-wrap -mt-2 -mr-2">
                <CourseCard></CourseCard>
            </div>
        </div>
    )
}
import Image from "next/image"
import Profile from "ui/profile/profile"
import SmallCourse from "ui/profile/course-small";

export default function Page()
{
    // const percentage = 66;
    return (
        <div className="flex flex-col border-solid border- border-black">
            <Profile></Profile>
            <div className="py-3"></div>
            <div className="flex flex-row rounded-t-3xl bg-white border-dashed border- border-red-600">
                <p className="text-2xl py-3 px-2.5">Your Courses</p>
            </div>
            <div className="flex flex-col bg-white">
                <div className="flex flex-row max-w-[100%] max-h-[150px] p-3 justify-between">
                    <SmallCourse></SmallCourse>
                    <SmallCourse></SmallCourse>
                    <SmallCourse></SmallCourse>
                </div>
            </div>
        </div>
    )
}
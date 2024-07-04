"use server";
import Upcoming from "@/components/home/upcoming";
import HomeScheduler from "@/components/home/scheduler";
import WelcomeAvatar from "@/components/home/avatar-welcome";
import { Spacer } from "@nextui-org/spacer";
import SmallCourse from "@/components/profile/course-small";

export default async function Page() {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <div className='flex flex-row flex-shrink drop-shadow-md border-solid border- border-black rounded-full bg-white'>
          <WelcomeAvatar></WelcomeAvatar>
        </div>
        <div className='flex flex-grow'></div>
      </div>
      <Spacer y={5}></Spacer>
      <div className='flex flex-col w-full h-full drop-shadow-md border-solid border-1 border-gray/10 rounded-xl bg-white py-5'>
        <div className='flex flex-row w-full h-full'>
          <div className='flex flex-col w-full h-full border-solid border- border-black'>
            <div className='text-[1.5rem] ml-5'>Scheduler</div>
            <div className='p-1.5'>
              <HomeScheduler></HomeScheduler>
            </div>
          </div>
          <div className='flex flex-col h-[calc(100vh*.8)] border-solid border- border-black'>
            <div className='text-[1.5rem]'>Upcoming</div>
            <Upcoming />
          </div>
        </div>
      </div>
      <Spacer y={5}></Spacer>
      <div className='flex flex-col pt-3 drop-shadow-md w-full h-auto border-solid border-1 border-gray/10 rounded-xl bg-white'>
        <div className='text-[1.5rem] mt-1.5 ml-3'>Completed Trainings</div>
        <SmallCourse></SmallCourse>
      </div>
    </div>
  );
}

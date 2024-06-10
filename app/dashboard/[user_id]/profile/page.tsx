"use client";

import Image from "next/image";
import Profile from "@/components/profile/profile";
import SmallCourse from "@/components/profile/course-small";
import ProfileSection from "@/components/profile/profile-section";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CakeIcon,
  CalendarIcon,
  HomeIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
import AboutItem from "@/components/profile/about-item";
import HomeScheduler from "@/components/home/scheduler";
// import { Scheduler } from "@bitnoi.se/react-scheduler";
// import { SCHEDULER_DATA } from "lib/mock_data";

export default function Page() {
  // const percentage = 66;
  return (
    <div className='flex flex-col border-solid border- border-black'>
      <Profile></Profile>
      <div className='py-3'></div>
      <ProfileSection sectionName='About' roundedTop={true}>
        <div className='flex flex-row flex-wrap justify-center items-center'>
          <AboutItem></AboutItem>
        </div>
      </ProfileSection>
      <ProfileSection sectionName='Schedule'>
        <div className='w-full h-[25rem] border-solid border-2 border-gray-200 m-1 relative overflow-hidden'>
          <HomeScheduler></HomeScheduler>
        </div>
      </ProfileSection>
      <ProfileSection sectionName='Ongoing Courses'>
        <SmallCourse></SmallCourse>
      </ProfileSection>
      <ProfileSection sectionName='Completed Courses' roundedBot={true}>
        <SmallCourse></SmallCourse>
      </ProfileSection>
    </div>
  );
}

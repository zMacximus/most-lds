import Image from "next/image"
import Profile from "ui/profile/profile"
import SmallCourse from "ui/profile/course-small";
import ProfileSection from "ui/profile/profile-section";
import { BriefcaseIcon, BuildingOfficeIcon, CakeIcon, CalendarIcon, HomeIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import AboutItem from "ui/profile/about-item";

export default function Page()
{
    // const percentage = 66;
    return (
        <div className="flex flex-col border-solid border- border-black">
            <Profile></Profile>
            <div className="py-3"></div>
            <ProfileSection sectionName="About" roundedTop={true}>
                <div className="flex flex-row flex-wrap justify-center items-center">
                    <AboutItem></AboutItem>
                </div>
            </ProfileSection>
            <ProfileSection sectionName="Ongoing Courses">
                <SmallCourse></SmallCourse>
                <SmallCourse></SmallCourse>
                <SmallCourse></SmallCourse>
            </ProfileSection>
            <ProfileSection sectionName="Completed Courses" roundedBot={true}>
                <SmallCourse></SmallCourse>
                <SmallCourse></SmallCourse>
                <SmallCourse></SmallCourse>
            </ProfileSection>
        </div>
    )
}
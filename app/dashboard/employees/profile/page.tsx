import Image from "next/image"
import Profile from "ui/profile/profile"
import SmallCourse from "ui/profile/course-small";
import ProfileSection from "ui/profile/profile-section";

export default function Page()
{
    // const percentage = 66;
    return (
        <div className="flex flex-col border-solid border- border-black">
            <Profile></Profile>
            <div className="py-3"></div>
            <ProfileSection sectionName="Ongoing Courses" roundedTop={true}>
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
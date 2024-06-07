import CourseCard from "@/components/trainings/course-card";

export default function Page()
{
    return (
        <div className="flex flex-col border-solid border- border-black bg-white rounded-2xl">
            <p className="text-[2em] p-3">Your Trainings</p>
            <div className="flex flex-row border-solid border- border-blue-400 p-5 flex-wrap -mt-2 -mr-2">
                <CourseCard></CourseCard>
            </div>
        </div>
    )
}
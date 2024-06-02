import { BriefcaseIcon, BuildingOfficeIcon, CakeIcon, CalendarIcon, HomeIcon, PaintBrushIcon, TagIcon } from "@heroicons/react/24/outline"

const DATA = [
    {icon: CakeIcon, title: "Birthday", value: "10/20/2001"},
    {icon: CalendarIcon, title: "Join Date", value: "05/06/2024"},
    {icon: BuildingOfficeIcon, title: "Department", value: "Human Resources"},
    {icon: BriefcaseIcon, title: "Position", value: "Administrator"},
    {icon: HomeIcon, title: "Adress", value: "Cotabato City"},
    {icon: TagIcon, title: "Religion", value: "Muslim"},
]

export default function AboutItem()
{
    return (
        <>
            {DATA.map((data) => {
                return (
                    <div className="flex flex-col px-10 py-5 border-solid border-2 border-gray-200 rounded-xl mt-2 mr-2">
                        <div className="flex flex-row text-lg">
                            <data.icon width={"1.5vw"}></data.icon>
                            <div className="pl-1">
                                <p>{data.title}</p>
                            </div>
                            <div className="pl-1 text-gray-500 ml-2">
                                <p>{data.value}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
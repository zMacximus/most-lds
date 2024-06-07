import { Divider } from "@nextui-org/react";
import Image from "next/image";
import placeholderMan from "../../../public/placeholder/Placeholder-Man.jpg"
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StatusBadge from "@/components/status-badge";

const DATA = [
{code: "CVL-001", title: "All About Henry Cavill 01", url: placeholderMan, alt_text: "", instructor: "Henry Cavill", course_link: "", course_info_link: "", status: true},
{code: "CVL-002", title: "All About Henry Cavill 02", url: placeholderMan, alt_text: "", instructor: "Henry Cavill", course_link: "", course_info_link: "", status: false},
{code: "CVL-003", title: "All About Henry Cavill 03", url: placeholderMan, alt_text: "", instructor: "Henry Cavill", course_link: "", course_info_link: "", status: true},
];

// Above is placeholder data

export default function CourseCard()
{
    return (
        <>
            {/* Ideally, index is not auto generated, and should come from the database to separate the courses according to the uid */}
            {DATA.map((data, index) => {
                return (
                    <div className="mt-2 mr-2" key={index}>
                        <Link href={data.course_link}>
                            <div className="flex flex-col max-w-[20vw] border-solid border-2 border-gray-300">
                                <div className="w-full max-h-[8em] overflow-hidden relative">
                                    <Image src={data.url} alt={data.alt_text}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto">
                                    </Image>
                                </div>
                                <div className="text-[1em] p-2 items-start">
                                    <div className="flex flex-row justify-between items-center text-gray-500 text-[.9em]">
                                        <p>{data.code}</p>
                                        <StatusBadge Open={data.status}></StatusBadge>
                                    </div>
                                    <div className="py-1"></div>
                                    <p className="max-w-[50%] overflow-clip">{data.title}</p>
                                </div>
                                <Divider></Divider>
                                <div className="flex flex-row items-center justify-between p-2">
                                    <p>{data.instructor}</p>
                                    <Link href={data.course_info_link} className="text-black hover:text-blue-600">
                                        <InformationCircleIcon width={"1.5em"}></InformationCircleIcon>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </>
    )   
}
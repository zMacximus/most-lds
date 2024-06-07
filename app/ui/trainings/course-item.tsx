import Image from "next/image"
import { PencilIcon, TrashIcon, PlusCircleIcon, UserIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import placeholderMan from "../../../public/placeholder/Placeholder-Man.jpg";
import Link from "next/link"
import StatusBadge from "@/components/status-badge"
// import { usePathname } from "next/navigation"

const DATA = [
    {code: "CVL-001", title: "All About Henry Cavill 01", modality: "On-Site", open: true, trainee_count: 42, max_trainees: 100},
    {code: "CVL-002", title: "All About Henry Cavill 02", modality: "Online", open: false, trainee_count: 12, max_trainees: 100},
    {code: "CVL-003", title: "All About Henry Cavill 03", modality: "Online", open: true, trainee_count: 23, max_trainees: 100},
    {code: "CVL-004", title: "All About Henry Cavill 04", modality: "On-Site", open: false, trainee_count: 39, max_trainees: 100},
    {code: "CVL-005", title: "All About Henry Cavill 05", modality: "Online", open: false, trainee_count: 2, max_trainees: 100},
]

export default function CourseItem()
{
    // const pathName = usePathname();
    return (
        <>
            {DATA.map((data) => {
                return (
                    <>
                    <div className="flex flex-row border-solid border-2 border-gray-50 rounded-full">
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                            {data.code}
                            {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
                        </div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.title}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.modality}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                            <StatusBadge Open={data.open}></StatusBadge>
                        </div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.trainee_count}/{data.max_trainees}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                            <div className="flex flex-row">
                                <Link href=""><PencilIcon width={30}></PencilIcon></Link>
                                {/* <div className="px-2"></div>
                                <Link href=""><PlusCircleIcon width={30}></PlusCircleIcon></Link> */}
                                {/* <div className="px-1"></div>
                                <Link href=""><TrashIcon width={30}></TrashIcon></Link> */}
                                <div className="px-2"></div>
                                <Link href=""><InformationCircleIcon width={30}></InformationCircleIcon></Link>
                            </div>
                        </div>
                    </div>
                    <div className="py-1"></div>
                    </>
                )
            })}
        </>
    )
}
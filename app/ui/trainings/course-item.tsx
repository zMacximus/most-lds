import Image from "next/image"
import { PencilIcon, TrashIcon, PlusCircleIcon, UserIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import placeholderMan from "../../../public/Placeholder-Man.jpg"
import Link from "next/link"
// import { usePathname } from "next/navigation"

export default function CourseItem()
{
    // const pathName = usePathname();
    return (
        <>
            <div className="flex flex-row border-solid border-2 border-gray-50 rounded-full">
                <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                    CVL-001
                    {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
                </div>
                <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">All About Henry Cavill 01</div>
                <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">On-Site</div>
                <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">Available</div>
                <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">42/100</div>
                <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                    <div className="flex flex-row">
                        <Link href=""><PencilIcon width={30}></PencilIcon></Link>
                        {/* <div className="px-2"></div>
                        <Link href=""><PlusCircleIcon width={30}></PlusCircleIcon></Link> */}
                        {/* <div className="px-1"></div>
                        <Link href=""><TrashIcon width={30}></TrashIcon></Link> */}
                        <div className="px-2"></div>
                        <Link href="/dashboard/employees/profile"><InformationCircleIcon width={30}></InformationCircleIcon></Link>
                    </div>
                </div>
            </div>
            <div className="py-1"></div>
        </>
    )
}
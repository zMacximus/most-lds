import Image from "next/image"
import { PencilIcon, TrashIcon, PlusCircleIcon, UserIcon } from "@heroicons/react/24/outline"
import placeholderMan from "public/placeholder/Placeholder-Man.jpg"
import Link from "next/link"
// import { usePathname } from "next/navigation"

const DATA = [
    {image: placeholderMan, last_name: "Cavill", first_name: "Henry", department: "Acting", Title: "Actor"},
    {image: placeholderMan, last_name: "Cavill", first_name: "Bob", department: "Accounting", Title: "Finance Chief"},
    {image: placeholderMan, last_name: "Cavill", first_name: "Mark", department: "Human Resources", Title: "Supervisor"},
    {image: placeholderMan, last_name: "Cavill", first_name: "Adam", department: "Janitorial", Title: "Powerwasher"},
    {image: placeholderMan, last_name: "Cavill", first_name: "Geralt", department: "Athletics", Title: "Waterboy"},
]

export default function UserItem()
{
    const sampleUser = "TheRealHenryCavill"
    // const pathName = usePathname();
    return (
        <>
            {DATA.map((data) => {
                return (
                    <>
                    <div className="flex flex-row border-solid border-2 border-gray-50 rounded-full">
                        <div className="p-2 flex flex-initial justify-center items-center border-dashed border- border-red-600">
                            <Image src={data.image} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image>
                        </div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.last_name}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.first_name}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.department}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">{data.Title}</div>
                        <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                            <div className="flex flex-row">
                                <Link href=""><PencilIcon width={30}></PencilIcon></Link>
                                {/* <div className="px-2"></div>
                                <Link href=""><PlusCircleIcon width={30}></PlusCircleIcon></Link> */}
                                {/* <div className="px-1"></div>
                                <Link href=""><TrashIcon width={30}></TrashIcon></Link> */}
                                <div className="px-2"></div>
                                <Link href={`/dashboard/${sampleUser}/employees-list/Cavilleros/profile`}><UserIcon width={30}></UserIcon></Link>
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
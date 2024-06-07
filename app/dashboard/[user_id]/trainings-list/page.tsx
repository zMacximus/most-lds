import { ArrowRightIcon, MagnifyingGlassIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, commonColors, Input, LinkIcon, Pagination, Spacer } from "@nextui-org/react";
import Link from "next/link";
import CourseItem from "@/components/trainings/course-item";

export default function Page()
{
    return (
        <div className="p-5 flex flex-row w-full bg-white rounded-3xl border-dashed border- border-green-600">
            <div className="flex flex-col w-full">
                <div className="flex flex-row basis-10">
                    <Input
                    type="search"
                    // label="Search"
                    // labelPlacement=""
                    placeholder="Search..."
                    startContent={
                        <MagnifyingGlassIcon height={"1em"}>Search</MagnifyingGlassIcon>
                    }
                    ></Input>
                    <Spacer x={5}></Spacer>
                    <Link href="">
                        <div className="flex flex-row justify-center items-center max-h-[2.5em] max-w-[100em] bg-green-600 rounded-md hover:bg-green-500 active:bg-green-700">
                            <PlusCircleIcon width={"2.5em"} color="white" className="p-1.5"></PlusCircleIcon>
                            <span className="text-nowrap text-white pr-2.5">Add Training</span>
                        </div>
                    </Link>
                    {/* <Button color="success" className="">
                        <PlusIcon width={"100000em"}></PlusIcon>Add Employee</Button> */}
                </div>
                <div className="py-5 flex flex-row border-solid border- border-black">
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Code</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Title</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Modality</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Status</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Trainee Count</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Action</div>
                </div>
                <div className="border- border-solid border-black">
                    <CourseItem></CourseItem>
                </div>
                <div className="flex flex-row justify-center items-center py-3 border-solid border- border-black">
                    <Pagination showControls total={10} initialPage={1} isCompact variant="light" color="success"></Pagination>
                    {/* <div className="px-1"><Link href="" className="border-solid border-2 border-gray-300 rounded-md px-2">&lt;</Link></div>
                    <div className="px-1"><Link href="" className="border-solid border-2 border-gray-300 rounded-md px-2.5">1</Link></div>
                    <div className="px-1"><Link href="" className="border-solid border-2 border-gray-300 rounded-md px-2.5">2</Link></div>
                    <div className="px-1"><Link href="" className="border-solid border-2 border-gray-300 rounded-md px-2.5">3</Link></div>
                    <div className="px-1"><Link href="" className="border-solid border-2 border-gray-300 rounded-md px-2">&gt;</Link></div> */}
                </div>
            </div>
        </div>
    )
}
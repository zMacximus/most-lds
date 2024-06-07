import { ArrowRightIcon, MagnifyingGlassIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, commonColors, Input, LinkIcon, Pagination, Spacer } from "@nextui-org/react";
import Link from "next/link";
import UserItem from "@/components/employees/user-item";

export default function Page()
{
    return (
        <div className="p-5 flex flex-row w-full bg-white rounded-3xl border-dashed border- border-green-600">
            <div className="flex flex-col w-full">
                <div className="flex flex-row basis-10">
                    <Input
                    type="search"
                    placeholder="Search..."
                    startContent={
                        <MagnifyingGlassIcon height={"1em"}>Search</MagnifyingGlassIcon>
                    }
                    ></Input>
                    <Spacer x={5}></Spacer>
                    <Link href="">
                        <div className="flex flex-row justify-center items-center max-h-[2.5em] max-w-[100em] bg-green-600 rounded-md hover:bg-green-500 active:bg-green-700">
                            <PlusCircleIcon width={"2.5em"} color="white" className="p-1.5"></PlusCircleIcon>
                            <span className="text-nowrap text-white pr-2.5">Add Employee</span>
                        </div>
                    </Link>
                </div>
                <div className="py-5 flex flex-row border-solid border- border-black">
                    <div className="flex flex-[0.42] justify-center items-center border-dashed border- border-red-600">Photo</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Last Name</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">First Name</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Department</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Title</div>
                    <div className="flex flex-1 justify-center items-center border-dashed border- border-red-600">Action</div>
                </div>
                <div className="border- border-solid border-black">
                    <UserItem></UserItem>
                </div>
                <div className="flex flex-row justify-center items-center py-3 border-solid border- border-black">
                    <Pagination showControls total={10} initialPage={1} isCompact variant="light" color="success"></Pagination>
                </div>
            </div>
        </div>
    )
}
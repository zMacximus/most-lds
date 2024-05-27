import UserItem from "ui/employees/user-item";

export default function Page()
{
    return (
        <div className="p-5 flex flex-row w-full bg-white rounded-3xl border-dashed border- border-green-600">
            <div className="flex flex-col w-full">
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
                    <div className="py-1"></div>
                    <UserItem></UserItem>
                    <div className="py-1"></div>
                    <UserItem></UserItem>
                    <div className="py-1"></div>
                    <UserItem></UserItem>
                    <div className="py-1"></div>
                    <UserItem></UserItem>
                </div>
            </div>
        </div>
    )
}
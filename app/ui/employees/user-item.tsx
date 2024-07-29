"use client";
import Image from "next/image";
import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import placeholderMan from "public/placeholder/Placeholder-Man.jpg";
import genericUser from "public/placeholder/generic-user.png";
import Link from "next/link";
import { EmployeeFormInput, employeeListData } from "@/lib/definitions";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
import NewEmployeeForm from "./new-eployee-form";
import DeleteContentForm from "../e-lib/delete-content-modal";
// import { useState } from "react";

export default function UserItem({ dbData }: { dbData: EmployeeFormInput[] }) {
  // console.log(placeholderMan.src);
  // const searchParams = new URLSearchParams();
  const router = useRouter();
  return (
    <>
      {dbData.map((data) => {
        // console.log(data);
        // const [imageSrc, setImageSrc] = useState(
        //   `/api/profile-images/${data.username}.jpg`
        // );
        const src = data.image ? data.image : genericUser;
        // const src =

        return (
          <div
            key={`${data.username}` + `_${data}`}
            className='flex flex-row border-solid border-1 border-gray-400 rounded-full'
          >
            <div className='p-2 flex flex-initial justify-center items-center border-dashed border- border-red-600'>
              <Image
                // loader={() => src}
                src={src}
                width={100}
                height={100}
                alt={`${data.firstName} ${data.lastName}`}
                className='rounded-full border-solid border- border-pink-600 w-[70px] h-[70px]'
                // onError={() => setImageSrc(placeholderMan.src)}
              />
            </div>
            <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
              {data.firstName}
            </div>
            <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
              {data.lastName}
            </div>
            <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
              {data.department}
            </div>
            <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
              {data.title}
            </div>
            <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
              <div className='flex flex-row'>
                {/* <Link href=''>
                  <PencilIcon width={30} />
                </Link> */}
                <AccordionModalFormButton buttonIcon={"pencil"}>
                  <NewEmployeeForm
                    loadData={true}
                    dataToLoad={data}
                  ></NewEmployeeForm>
                </AccordionModalFormButton>
                {/* <AccordionModalFormButton buttonIcon={"eye"}>
                  <NewEmployeeForm></NewEmployeeForm>
                </AccordionModalFormButton> */}
                <Button
                  isIconOnly
                  variant='light'
                  onPress={() => {
                    // console.log("PROFILE BUTTON");
                    // searchParams.set("user_id", data.username);
                    router.push(
                      `./employees-list/${data.username}/profile?user_id=${data.username}`
                    );
                  }}
                >
                  <UserIcon width={25} />
                </Button>
                <AccordionModalFormButton buttonIcon={"trash"} buttonSize='md'>
                  <DeleteContentForm
                    content_id={0}
                    user_id={data.username}
                    contentType={"user"}
                  ></DeleteContentForm>
                </AccordionModalFormButton>
                {/* <div className='px-2'></div>
                <Button
                  isIconOnly
                  variant='light'
                  onPress={() => {
                    console.log("PROFILE BUTTON");
                    // searchParams.set("user_id", data.username);
                    router.push(
                      `./employees-list/${data.username}/profile?user_id=${data.username}`
                    );
                  }}
                >
                  <UserIcon width={30} />
                </Button> */}
                {/* <Link href={`./employees-list/${data.username}/profile`}>
                  <UserIcon width={30} />
                </Link> */}
              </div>
            </div>
          </div>
        );
      })}
      <div className='py-1'></div>
    </>
  );
}

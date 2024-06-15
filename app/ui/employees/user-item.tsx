"use client";
import Image from "next/image";
import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import placeholderMan from "public/placeholder/Placeholder-Man.jpg";
import Link from "next/link";
import { employeeListData } from "@/lib/definitions";
// import { useState } from "react";

export default function UserItem({ dbData }: { dbData: employeeListData[] }) {
  // console.log(placeholderMan.src);
  return (
    <>
      {dbData.map((data) => {
        // const [imageSrc, setImageSrc] = useState(
        //   `/api/profile-images/${data.username}.jpg`
        // );
        const src = `/uploads/profile-images/daPiang.jpg`;
        return (
          <div
            key={data.username}
            className='flex flex-row border-solid border-1 border-gray-400 rounded-full'
          >
            <div className='p-2 flex flex-initial justify-center items-center border-dashed border- border-red-600'>
              <Image
                // loader={() => src}
                src={src}
                width={70}
                height={70}
                alt={`${data.firstName} ${data.lastName}`}
                className='rounded-full border-solid border- border-pink-600'
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
                <Link href=''>
                  <PencilIcon width={30} />
                </Link>
                <div className='px-2'></div>
                <Link href={`./employees-list/${data.username}/profile`}>
                  <UserIcon width={30} />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className='py-1'></div>
    </>
  );
}

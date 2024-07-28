"use client";
import { Button, Divider, Spacer } from "@nextui-org/react";
import Image from "next/image";
import placeholderMan from "../../../public/placeholder/Placeholder-Man.jpg";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StatusBadge from "@/components/status-badge";
import { TrainingType } from "@/lib/models/Training";

export default function CourseCard({ dbData }: { dbData: TrainingType[] }) {
  return (
    <>
      {dbData.map((data) => (
        <div
          className='mt-2 transition' //hover:-translate-y-1 hover:scale-105
          key={data.id}
        >
          <div className='flex flex-col max-w-[278px] border-solid border-2 border-gray-400 hover:shadow-md'>
            <Link href={data.url}>
              <div className='w-full max-h-[150px] overflow-hidden relative'>
                <Image
                  src={placeholderMan}
                  alt='Course Image'
                  width={278}
                  height={150}
                  className='w-full h-auto object-fill'
                />
              </div>
              <div className='text-[1em] p-2 items-start'>
                <div className='flex flex-row justify-between items-center text-gray-600 text-[.9em] mt-1'>
                  <p>{data.code}</p>
                  <StatusBadge status={Boolean(data.status)} />
                </div>
                <div className='py-1'></div>
                <p className='max-w-[65%] overflow-clip'>{data.title}</p>
              </div>
            </Link>
            <Divider />
            <div className='flex flex-row items-center justify-between p-2'>
              <p>{data.instructor}</p>
              <Button
                color='primary'
                size='sm'
                radius='lg'
                className='text-white'
              >
                Join
              </Button>
            </div>
          </div>
          <Spacer x={2} />
        </div>
      ))}
    </>
  );
}

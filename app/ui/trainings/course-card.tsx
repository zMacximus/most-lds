"use client";
import { Divider, Spacer } from "@nextui-org/react";
import Image from "next/image";
import placeholderMan from "../../../public/placeholder/Placeholder-Man.jpg";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StatusBadge from "@/components/status-badge";
import { TrainingType } from "@/lib/models/Training";
import { Model } from "sequelize";

// Above is placeholder data

export default function CourseCard({ dbData }: { dbData: TrainingType[] }) {
  return (
    <>
      {/* Ideally, index is not auto generated, and should come from the database to separate the courses according to the uid */}
      {dbData.map((data) => {
        return (
          <>
            <div
              className='mt-2 transition hover:-translate-y-1 hover:scale-105'
              key={data.id}
            >
              <Link href=''>
                <div className='flex flex-col max-w-[278px] border-solid border-2 border-gray-400 hover:shadow-md'>
                  <div className='w-full max-h-[150px] overflow-hidden relative'>
                    <Image
                      src={placeholderMan}
                      alt=''
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='w-full h-auto object-fill'
                    ></Image>
                  </div>
                  <div className='text-[1em] p-2 items-start'>
                    <div className='flex flex-row justify-between items-center text-gray-600 text-[.9em] mt-1'>
                      <p>{data.code}</p>
                      <StatusBadge status={Boolean(data.status)}></StatusBadge>
                    </div>
                    <div className='py-1'></div>
                    <p className='max-w-[65%] overflow-clip'>{data.title}</p>
                  </div>
                  <Divider></Divider>
                  <div className='flex flex-row items-center justify-between p-2'>
                    <p>{data.instructor}</p>
                    <Link href='' className='text-black hover:text-blue-600'>
                      <InformationCircleIcon
                        width={"1.5em"}
                      ></InformationCircleIcon>
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
            <Spacer x={2}></Spacer>
          </>
        );
      })}
    </>
  );
}

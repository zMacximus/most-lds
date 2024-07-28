"use client";
import { Button, Divider, Spacer } from "@nextui-org/react";
import Image from "next/image";
import placeholderMan from "../../../public/placeholder/Placeholder-Man.jpg";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StatusBadge from "@/components/status-badge";
import { TrainingType } from "@/lib/models/Training";
import {
  hasJoined,
  joinTraining,
  leaveTraining,
} from "@/lib/models/EnrolledTrainings";
import { useEffect, useState } from "react";

export default function CourseCard({
  dbData,
  user_id,
}: {
  dbData: TrainingType[];
  user_id: string;
}) {
  const [joinedStatuses, setJoinedStatuses] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchJoinedStatuses = async () => {
      const statuses = await Promise.all(
        dbData.map(async (data) => {
          const joined = await hasJoined(user_id, data.id);
          return { [data.id]: joined };
        })
      );
      setJoinedStatuses(Object.assign({}, ...statuses));
    };

    fetchJoinedStatuses();
  }, [dbData, user_id]);

  const handleJoin = async (training_id: number) => {
    await joinTraining(user_id, training_id);
    setJoinedStatuses((prev) => ({ ...prev, [training_id]: true }));
  };

  const handleLeave = async (training_id: number) => {
    await leaveTraining(user_id, training_id);
    setJoinedStatuses((prev) => ({ ...prev, [training_id]: false }));
  };

  return (
    <>
      {dbData.map((data) => {
        const joined = joinedStatuses[data.id] || false;

        return (
          <div className='mt-2 mr-2' key={data.id + data.title}>
            <div className='flex flex-col max-w-[278px] min-h-[313px] max-h-[311px] border-solid border-2 border-gray-400 hover:shadow-md'>
              <Link href={data.url}>
                <div className='w-full max-h-[150px] overflow-hidden relative'>
                  <Image
                    src={data.image ? data.image : placeholderMan}
                    alt='Course Image'
                    width={278}
                    height={150}
                    className='w-full h-auto object-fill'
                  />
                </div>
                <div className='flex flex-col min-h-[110px] text-[1em] p-2 items-start border-solid border- border-red-500'>
                  <div className='flex flex-row w-full h-full justify-between items-center text-gray-600 text-[.9em] mt-1'>
                    <p>{data.code}</p>
                    <StatusBadge status={Boolean(data.status)} />
                  </div>
                  <div className='py-1'></div>
                  <p className='max-w-[65%] overflow-clip'>{data.title}</p>
                </div>
              </Link>
              <div className='flex flex-col w-full justify-end items-end  border-solid border- border-red-500'>
                <Divider />
                <div className='flex flex-row w-full items-center justify-between p-2'>
                  <p>{data.instructor}</p>
                  {joined ? (
                    <Button
                      color='danger'
                      size='sm'
                      radius='lg'
                      className='text-white'
                      onPress={() => handleLeave(data.id)}
                    >
                      Leave
                    </Button>
                  ) : (
                    <Button
                      color='primary'
                      size='sm'
                      radius='lg'
                      className='text-white'
                      isDisabled={Number(data.status) == 0}
                      onPress={() => handleJoin(data.id)}
                    >
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Spacer x={2} />
          </div>
        );
      })}
    </>
  );
}

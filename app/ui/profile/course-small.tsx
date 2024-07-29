"use client";
import Image from "next/image";
import placeholderCourse from "public/placeholder/Placeholder-Man.jpg";
import { CircularProgress } from "@nextui-org/progress";
import { Spacer } from "@nextui-org/react";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { getCompletedTrainingData } from "@/server/actions";
import { useEffect, useState } from "react";

export default function SmallCourse({ user_id }: { user_id?: string }) {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      if (user_id) {
        try {
          const data = await getCompletedTrainingData(user_id);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [user_id]);

  if (!userData || userData.length === 0) {
    return <p>No data available</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className='flex flex-row mx-3 mb-3 overflow-x-scroll'>
      {userData.map((data, index) => (
        <div className='flex-none w-[50vh]' key={data.id + data.title}>
          <div className='flex flex-row items-center min-w-[380px] max-w-[380px] min-h-[100px] max-h-[100px] bg-white border-solid border-2 border-gray-400 overflow-hidden mt-2 mr-2'>
            <div className='overflow-hidden relative max-w-[150px] max-h-[150px]'>
              <Image
                src={data.image ? data.image : placeholderCourse}
                width={150}
                height={150}
                alt='Course Image'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex flex-col'>
              <p className='text-lg font-semibold text-clip mx-2'>
                {data.title}
              </p>
              <p className='text-medium text-gray-600 text-clip mx-2'>
                {data.code}
              </p>
            </div>
            <div className='rounded-full bg-primary-200 mx-3'>
              <CheckCircleIcon
                width={35}
                color='primary'
                className='text-lg text-primary'
              ></CheckCircleIcon>
            </div>
          </div>
          {index < userData.length - 1 && <Spacer x={5} />}
        </div>
      ))}
    </div>
  );
}

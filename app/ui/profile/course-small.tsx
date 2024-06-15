import Image from "next/image";
import placeholderCourse from "public/placeholder/Placeholder-Man.jpg";

import { CircularProgress } from "@nextui-org/progress";
import { Spacer } from "@nextui-org/react";

const DATA = [
  {
    title: "All About Henry Cavill 01",
    code: "CVL-001",
    completionRate: 100.0,
  },
  {
    title: "All About Henry Cavill 02",
    code: "CVL-002",
    completionRate: 100.0,
  },
  {
    title: "All About Henry Cavill 03",
    code: "CVL-003",
    completionRate: 100.0,
  },
  {
    title: "All About Henry Cavill 04",
    code: "CVL-004",
    completionRate: 100.0,
  },
  {
    title: "All About Henry Cavill 05",
    code: "CVL-005",
    completionRate: 100.0,
  },
];

export default function SmallCourse() {
  // const value = 50;
  return (
    <div className='flex flex-row mx-3 mb-3 overflow-x-scroll'>
      {DATA.map((data, index) => {
        const valueColor =
          data.completionRate === 100.0 ? "success" : "warning";
        return (
          <>
            <div className='flex-none w-[50vh]' key={index}>
              <div className='flex flex-row items-center w-full h-auto bg-white border-solid border-2 border-gray-400 overflow-hidden mt-2 mr-2'>
                <Image
                  src={placeholderCourse}
                  width={150}
                  height={150}
                  alt='Course Image'
                ></Image>
                <div className='flex flex-col'>
                  <p className='text-lg font-semibold text-clip mx-2'>
                    {data.title}
                  </p>
                  <p className='text-medium text-gray-600 text-clip mx-2'>
                    {data.code}
                  </p>
                </div>
                {/* <p className="text-lg px-3">66%</p> */}
                <CircularProgress
                  className='px-3'
                  size='lg'
                  color={valueColor}
                  value={data.completionRate}
                  valueLabel={`${data.completionRate} %`}
                  showValueLabel={true}
                ></CircularProgress>
              </div>
            </div>
            {index < DATA.length - 1 && <Spacer x={5} />}
          </>
        );
      })}
    </div>
  );
}

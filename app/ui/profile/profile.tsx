import { UserType } from "@/lib/models/User";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CakeIcon,
  CalendarIcon,
  EnvelopeIcon,
  HeartIcon,
  HomeIcon,
  HomeModernIcon,
  MoonIcon,
  PhoneIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import placeholderMan from "public/placeholder/Placeholder-Man.jpg";

export default function Profile({ data }: { data: UserType }) {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-row w-[calc(100vh*0.5)] h-auto p-5 justify-center items-center bg-white rounded-3xl drop-shadow-md'>
        <div className='flex flex-col m-5 border-dashed border- border-red-600'>
          <Image
            className='rounded-full drop-shadow-md'
            src={placeholderMan}
            width={300}
            height={300}
            alt='Profile Picture'
          ></Image>
          <div className='flex flex-col items-center py-3 border-dashed border- border-red-600'>
            <p className='text-3xl text-center'>
              {data.lastName}, {data.firstName}
            </p>
            <Spacer y={4}></Spacer>
            <p>{data.title}</p>
            <p>{data.department}</p>
            {/* <Link className='text-gray-400 hover:text-sky-600' href=''>
          Edit Profile
        </Link> */}
          </div>
        </div>
      </div>
      <Spacer x={5}></Spacer>
      <div className='flex flex-col w-full p-7 bg-white rounded-3xl drop-shadow-md border-solid border- border-red-500'>
        <p className='text-2xl'>About</p>
        <div className='flex flex-row'>
          <div className='flex flex-col justify-evenly h-full w-full p-3'>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <BriefcaseIcon width={"30px"}></BriefcaseIcon>
                <p>Title</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.title}</p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <CakeIcon width={"30px"}></CakeIcon>
                <p>Birthday</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.birthDay}</p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <EnvelopeIcon width={"30px"}></EnvelopeIcon>
                <p>Email</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.email}</p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <TagIcon width={"30px"}></TagIcon>
                <p>Employment</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>
                  {data.employmentStatus}
                </p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <MoonIcon width={"30px"}></MoonIcon>
                <p>Religion</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.religion}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-evenly h-full w-full p-3'>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <BuildingOffice2Icon width={"30px"}></BuildingOffice2Icon>
                <p>Department</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.department}</p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <HomeIcon width={"30px"}></HomeIcon>
                <p>Address</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.address}</p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <PhoneIcon width={"30px"}></PhoneIcon>
                <p>Phone</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>
                  +63 {data.phoneNumber}
                </p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <HeartIcon width={"30px"}></HeartIcon>
                <p>Status</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.maritalStatus}</p>
              </div>
            </div>
            <Spacer y={3}></Spacer>
            <div className='flex flex-row h-[50px] w-full justify-between items-center text-xl p-3 border-solid border-1 border-gray-600'>
              <div className='flex flex-row h-full w-full justify-start border-solid border- border-pink-300'>
                <CalendarIcon width={"30px"}></CalendarIcon>
                <p>Joined</p>
              </div>
              <div className='flex flex-row h-full w-full justify-end border-solid border- border-blue-300'>
                <p className='text-right text-ellipsis'>{data.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

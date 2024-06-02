import Image from "next/image"
import placeholderCourse from '../../../public/placeholder/Placeholder-Man.jpg'

import {CircularProgress} from "@nextui-org/progress";

export default function SmallCourse()
{
    const value = 50;
    return (
        <div className="flex flex-row items-center max-w-[33%] max-h-[100%] bg-white border-solid border-2 border-gray-100 rounded-2xl overflow-hidden mt-2 mr-2">
            <Image src={placeholderCourse} width={150} height={150} alt="Course Image"></Image>
            <p className="text-xl text-clip px-2">All About Henry Cavill 01</p>
            {/* <p className="text-lg px-3">66%</p> */}
            <CircularProgress className="px-3" size="lg" color="warning" value={value} valueLabel={`${value} %`} showValueLabel={true}></CircularProgress>
        </div>
    )
}
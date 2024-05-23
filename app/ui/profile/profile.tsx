import Image from "next/image"
import Link from "next/link"
import placeholderMan from "../../../public/Placeholder-Man.jpg"

export default function Profile() {
    return (
        <div className="bg-white rounded-3xl">
            <div className="flex flex-col items-center p-5 border-dashed border- border-red-600">
                <Image className="rounded-full" src={placeholderMan} width={300} height={300} alt="Profile Picture"></Image>
            </div>
            <div className="flex flex-col items-center py-3 border-dashed border- border-red-600">
                <p className="text-3xl">Henry Cavill</p>
                <Link className="text-gray-400 hover:text-sky-600" href="">Edit Profile</Link>
            </div>
        </div>    
    )
}
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import mostLogo from "public/logo.png"
import Image from 'next/image';
// import { lusitana } from 'ui/fonts';

export default function Logo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image src={mostLogo.src} height={1600} width={1600} alt="MOST-BARMM LOGO" quality={100} className="h-12 w-12"></Image>
      {/* <img src={mostLogo.src} className="h-12 w-12"></img> */}
      <p className="text-[35px]">HRMIS</p>
    </div>
  );
}

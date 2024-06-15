"use server";
// import Link from "next/link";
import SideNav from "@/components/dashboard/sidenav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <SideNav></SideNav>
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden border- border-solid border-black'>
      <div className='w-full flex-none md:w-64 border- border-solid border-black'>
        <SideNav />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12 border- border-solid border-black'>
        {children}
      </div>
    </div>
  );
}

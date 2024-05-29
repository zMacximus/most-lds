'use client';

import Link from 'next/link';
import AdminNavLinks from 'ui/dashboard/admin-nav-links';
import Logo from 'ui/hrmis-logo';
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, CogIcon, PowerIcon, ScaleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
// import { signOut } from 'next-auth/react';
import { signOut } from 'lib/actions';
import { Accordion, AccordionItem } from '@nextui-org/react';
import UserNavLinks from './user-nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-white">
      <Link
        className="mb-2 flex h-20 items-end justify-start bg-green-700 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* <UserNavLinks />
        <div className="hidden h-auto w-full grow bg-white md:block"></div> */}
        <Accordion defaultExpandedKeys={"1"}>
          <AccordionItem key="1" title="User"
          startContent={
            <UserGroupIcon height={"2em"}></UserGroupIcon>
          }>
            <UserNavLinks />
            <div className="hidden h-auto w-full grow bg-white md:block"></div>
          </AccordionItem>
          <AccordionItem key="2" title="Admin" 
          startContent={
            <Cog6ToothIcon height={"2em"}></Cog6ToothIcon>
          }>
            <AdminNavLinks />
            <div className="hidden h-auto w-full grow bg-white md:block">
            </div>
          </AccordionItem>
        </Accordion>
        <form
        action={async() => {
          // 'use server';
          await signOut();
          console.log("LOGOUT")
        }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 bg-white p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowLeftStartOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

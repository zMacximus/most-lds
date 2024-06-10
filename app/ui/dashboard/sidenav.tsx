"use server";
import Link from "next/link";
import Logo from "@/components/hrmis-logo";
import SideNavAccordion from "./s-nav-accordion";
import LogoutButton from "./logout-button";
import { getAdminLinks, getUserLinks } from "@/lib/nav-links";
import { getUserCookie } from "@/server/services/cookies";
import { CustomLink } from "@/lib/definitions";

export default async function SideNav() {
  const user_id = getUserCookie();
  const userLink: CustomLink[] = getUserLinks(user_id!);
  const adminLink: CustomLink[] = getAdminLinks(user_id!);
  return (
    <div className='flex h-full flex-col bg-white drop-shadow-md'>
      <Link
        className='mb-2 flex h-20 items-end justify-start bg-primary p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40'>
          <Logo />
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 '>
        <SideNavAccordion
          user_links={userLink}
          admin_links={adminLink}
        ></SideNavAccordion>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
}

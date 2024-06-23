"use client";

import { Cog6ToothIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionItem } from "@nextui-org/react";
import UserNavLinks from "@/components/dashboard/user-nav-links";
import AdminNavLinks from "@/components/dashboard/admin-nav-links";
import { CustomLink } from "@/lib/definitions";
import { icons } from "@/lib/nav-links";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNavAccordion({
  adminStatus,
  user_links,
  admin_links,
}: {
  adminStatus: Boolean;
  user_links: CustomLink[];
  admin_links: CustomLink[];
}) {
  const pathname = usePathname();
  return (
    <>
      {adminStatus ? (
        <Accordion defaultExpandedKeys={"accordion1"}>
          <AccordionItem
            key='accordion1'
            title='User'
            startContent={<UserGroupIcon height={"2em"}></UserGroupIcon>}
          >
            <UserNavLinks links={user_links} />
            <div className='hidden h-auto w-full grow bg-white md:block'></div>
          </AccordionItem>
          <AccordionItem
            key='accordion2'
            title='Admin'
            startContent={<Cog6ToothIcon height={"2em"}></Cog6ToothIcon>}
          >
            <AdminNavLinks links={admin_links} />
            <div className='hidden h-auto w-full grow bg-white md:block'></div>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className='flex flex-col'>
          {user_links.map((link) => {
            const LinkIcon = icons[link.icon as keyof typeof icons];
            return (
              <div className='mt-3'>
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex h-[48px] grow items-center justify-center gap-2 bg-white text-sm font-medium hover:bg-primary-200 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                      "bg-primary-200 text-primary": pathname === link.href,
                    }
                  )}
                >
                  <LinkIcon className='w-6' />
                  <p className='hidden md:block'>{link.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

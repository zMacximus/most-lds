'use client';

import {
  UserIcon,
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
// Button

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const sampleUser = "TheRealHenryCavill";

// FIX THE DYNAMIC ROUTING WHEN U GET BACK

const links = [
  { name: 'Home', href:`/dashboard/${sampleUser}/home`, icon: HomeIcon },
  { name: 'Trainings', href: `/dashboard/${sampleUser}/trainings`, icon: BriefcaseIcon },
  { name: 'Profile', href: `/dashboard/${sampleUser}/profile`, icon: UserIcon },
];

export default function UserNavLinks() {
  const pathname = usePathname();
  // const router = useRouter();
  // const test_id = router.query.user_id;
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            // onClick={() =>
            //   router.push(link.href)
            // }
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 bg-white text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href
              } 
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

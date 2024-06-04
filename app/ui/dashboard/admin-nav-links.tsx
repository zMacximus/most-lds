'use client';

import {
  UserIcon,
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CalendarIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const sampleUser = "TheRealHenryCavill"

const links = [
  { name: 'Employees List', href: `/dashboard/${sampleUser}/employees-list`, icon: UserGroupIcon},
  { name: 'Trainings List', href: `/dashboard/${sampleUser}/trainings-list`, icon:  BriefcaseIcon},
  { name: 'Forms List', href: `/dashboard/${sampleUser}/forms-list`, icon:  FolderIcon},
  { name: 'Scheduler', href: `/dashboard/${sampleUser}/scheduler`, icon:  CalendarIcon},
];

export default function AdminNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
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

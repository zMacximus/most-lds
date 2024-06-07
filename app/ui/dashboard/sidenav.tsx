import Link from 'next/link';
import Logo from '@/components/hrmis-logo';
// import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
// import { signOut } from 'next-auth/react';
import SideNavAccordion from './s-nav-accordion';
import LogoutButton from './logout-button';

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
        <SideNavAccordion></SideNavAccordion>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
}

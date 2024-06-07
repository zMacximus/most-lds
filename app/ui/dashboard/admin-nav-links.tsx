"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { type CustomLink } from "@/lib/definitions";
import { icons } from "@/lib/nav-links";

export default function AdminNavLinks({ links }: { links: CustomLink[] }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = icons[link.icon as keyof typeof icons];
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 bg-white text-sm font-medium hover:bg-primary-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-primary-200/50 text-primary": pathname === link.href,
              }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

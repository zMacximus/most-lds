'use client'

import { Cog6ToothIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { Accordion, AccordionItem } from "@nextui-org/react"
import UserNavLinks from "@/components/dashboard/user-nav-links"
import AdminNavLinks from "@/components/dashboard/admin-nav-links"

export default function SideNavAccordion()
{
    return (
        <>
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
        </>
    )
}
"use client";

import AdminTabContent from "@/components/e-lib/admin-tab-content";
// import GeneralTab from "@/components/e-lib/general-tab";
import { Tabs, Tab } from "@nextui-org/react";

export default function Page() {
  return (
    <div className='flex flex-col'>
      <Tabs>
        {/* <GeneralTab key={"general"} title={"GENERAL"}></GeneralTab>
         */}
        <Tab key={"general"} title={"GENERAL"}>
          <AdminTabContent categoryName={"general"}></AdminTabContent>
        </Tab>
        <Tab key={"admin"} title={"ADMIN"}>
          <AdminTabContent categoryName={"admin"}></AdminTabContent>
        </Tab>
        <Tab key={"rds"} title={"RDS"}>
          <AdminTabContent categoryName={"rds"}></AdminTabContent>
        </Tab>
        <Tab key={"tmos"} title={"TMOS"}>
          <AdminTabContent categoryName={"tmos"}></AdminTabContent>
        </Tab>
        <Tab key={"finance"} title={"FINANCE"}>
          <AdminTabContent categoryName={"finance"}></AdminTabContent>
        </Tab>
        <Tab key={"operations"} title={"OPERATIONS"}>
          <AdminTabContent categoryName={"operations"}></AdminTabContent>
        </Tab>
      </Tabs>
    </div>
  );
}

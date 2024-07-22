"use client";

import AdminTabContent from "@/components/e-lib/admin-tab-content";
// import GeneralTab from "@/components/e-lib/general-tab";
import { Tabs, Tab } from "@nextui-org/react";

export default function UploadLib({
  user_id,
  adminStatus,
}: {
  user_id: string;
  adminStatus: boolean;
}) {
  console.log("USER: ", user_id);
  return (
    <div className='flex flex-col'>
      <Tabs>
        {/* <GeneralTab key={"general"} title={"GENERAL"}></GeneralTab>
         */}
        <Tab key={"general"} title={"GENERAL"}>
          <AdminTabContent
            categoryName={"general"}
            user_id={user_id}
            adminStatus={adminStatus}
          ></AdminTabContent>
        </Tab>
        <Tab key={"admin"} title={"ADMIN"}>
          <AdminTabContent
            categoryName={"admin"}
            user_id={user_id}
            adminStatus={adminStatus}
          ></AdminTabContent>
        </Tab>
        <Tab key={"rds"} title={"RDS"}>
          <AdminTabContent
            categoryName={"rds"}
            user_id={user_id}
            adminStatus={adminStatus}
          ></AdminTabContent>
        </Tab>
        <Tab key={"tmos"} title={"TMOS"}>
          <AdminTabContent
            categoryName={"tmos"}
            user_id={user_id}
            adminStatus={adminStatus}
          ></AdminTabContent>
        </Tab>
        <Tab key={"finance"} title={"FINANCE"}>
          <AdminTabContent
            categoryName={"finance"}
            user_id={user_id}
            adminStatus={adminStatus}
          ></AdminTabContent>
        </Tab>
        <Tab key={"operations"} title={"OPERATIONS"}>
          <AdminTabContent
            categoryName={"operations"}
            user_id={user_id}
            adminStatus={adminStatus}
          ></AdminTabContent>
        </Tab>
      </Tabs>
    </div>
  );
}

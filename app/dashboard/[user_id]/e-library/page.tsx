"use client";

// import GeneralTab from "@/components/e-lib/general-tab";
import TabContent from "@/components/e-lib/tab-content";
import { Tabs, Tab } from "@nextui-org/react";

export default function Page() {
  return (
    <Tabs>
      {/* <GeneralTab key={"general"} title={"GENERAL"}></GeneralTab>
       */}
      <Tab key={"general"} title={"GENERAL"}>
        <TabContent categoryName={"general"}></TabContent>
      </Tab>
      <Tab key={"admin"} title={"ADMIN"}>
        <TabContent categoryName={"admin"}></TabContent>
      </Tab>
      <Tab key={"rds"} title={"RDS"}>
        <TabContent categoryName={"rds"}></TabContent>
      </Tab>
      <Tab key={"tmos"} title={"TMOS"}>
        <TabContent categoryName={"tmos"}></TabContent>
      </Tab>
      <Tab key={"finance"} title={"FINANCE"}>
        <TabContent categoryName={"finance"}></TabContent>
      </Tab>
      <Tab key={"operations"} title={"OPERATIONS"}>
        <TabContent categoryName={"operations"}></TabContent>
      </Tab>
    </Tabs>
  );
}

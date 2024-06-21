"use client";
import CourseItem from "@/components/trainings/course-item";
import Training from "@/lib/models/Training";
import { Op } from "sequelize";
import AdminFormTable from "@/components/forms/admin-form-table";
import { getAllAdminForms } from "@/lib/models/AdminForm";
import AdminFormItem from "../../../../ui/forms/admin-form-item";
import { Tab, Tabs } from "@nextui-org/react";

export default function Layout({
  adminformtable,
  idpformtable,
}: {
  adminformtable: React.ReactNode;
  idpformtable: React.ReactNode;
}) {
  return (
    <div className='flex flex-col h-full'>
      <Tabs>
        <Tab key='IDP' title='IDP Forms'>
          {idpformtable}
        </Tab>
        <Tab key='ADMINFORM' title='L&D Forms'>
          {adminformtable}
        </Tab>
      </Tabs>
    </div>
  );
}

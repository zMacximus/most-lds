import CourseItem from "@/components/trainings/course-item";
import Training from "@/lib/models/Training";
import { Op } from "sequelize";
import AdminFormTable from "@/components/forms/admin-form-table";
import { getAllAdminForms } from "@/lib/models/AdminForm";
import AdminFormItem from "@/components/forms/admin-form-item";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const dbData = await getAllAdminForms(query);

  function getDataForPage(pageNumber: number, data: any[]) {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    return data.slice(startIndex, endIndex);
  }
  const headers = [
    "L&D Title",
    "Employee",
    "Officer",
    "Submitted on",
    "L&D Date",
    "Status",
    "Action",
  ];
  return (
    <AdminFormTable
      tableHeaders={headers}
      dbData={dbData}
      currentPage={currentPage}
    >
      <AdminFormItem
        dbData={getDataForPage(currentPage, dbData)}
      ></AdminFormItem>
    </AdminFormTable>
  );
}

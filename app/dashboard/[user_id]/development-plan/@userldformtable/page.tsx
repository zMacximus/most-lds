import CourseItem from "@/components/trainings/course-item";
import Training from "@/lib/models/Training";
import { Op } from "sequelize";
import AdminFormTable from "@/components/forms/admin-form-table";
import {
  AdminFormType,
  getAllAdminForms,
  getAllUserLDForms,
} from "@/lib/models/AdminForm";
import AdminFormItem from "@/components/forms/admin-form-item";
import UserLDFormTable from "@/components/development-plan/user-ld-form-table";
import UserLDFormItem from "@/components/development-plan/user-ld-form-item";
import { getUserCookie } from "@/server/services/cookies";

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

  // Get user cookie
  const userCookie = getUserCookie();

  // Fetch data if user cookie is available
  let dbData: AdminFormType[] = [];
  if (userCookie) {
    dbData = await getAllUserLDForms(userCookie);
  }

  function getDataForPage(pageNumber: number, data: AdminFormType[]) {
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
    <UserLDFormTable
      tableHeaders={headers}
      dbData={dbData}
      currentPage={currentPage}
    >
      <UserLDFormItem
        dbData={getDataForPage(currentPage, dbData)}
      ></UserLDFormItem>
    </UserLDFormTable>
  );
}

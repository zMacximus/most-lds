"use server";
// import CourseCard from "@/components/trainings/course-card";
// import { getAllTrainings, TrainingType } from "@/lib/models/Training";
// import { getUserCookie } from "@/server/services/cookies";
// import { Spacer } from "@nextui-org/react";

// export default async function Page() {
//   const dbData = await getAllTrainings();
//   const user_id = getUserCookie();
//   return (
//     <div className='flex flex-col w-auto h-auto drop-shadow-md border-solid border- border-black bg-white rounded-2xl'>
//       <div className='flex flex-row'>
//         <p className='text-[1.5rem] ml-5 mt-4'>Trainings</p>
//       </div>
//       {/* <Spacer y={1}></Spacer> */}
//       <Spacer x={5}></Spacer>
//       <div className='flex flex-row border-solid border- border-blue-400 px-5 mb-4 flex-wrap -mt-2 -mr-2'>
//         <CourseCard dbData={dbData!} user_id={user_id!}></CourseCard>
//       </div>
//     </div>
//   );
// }

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
import UserTrainingsTable from "@/components/trainings/user-trainings-table";
import UserLDFormItem from "@/components/development-plan/user-ld-form-item";
import { getUserCookie } from "@/server/services/cookies";
import UserTrainingItem from "@/components/trainings/user-training-item";
import {
  getAllUserTrainings,
  UserTrainingType,
} from "@/lib/models/UserTraining";

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
  let dbData: UserTrainingType[] = [];
  if (userCookie) {
    dbData = await getAllUserTrainings(userCookie);
  }

  function getDataForPage(pageNumber: number, data: UserTrainingType[]) {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    return data.slice(startIndex, endIndex);
  }

  const headers = ["Training", "Date of Completion", "Actions"];

  return (
    <UserTrainingsTable
      tableHeaders={headers}
      dbData={dbData}
      currentPage={currentPage}
    >
      <UserTrainingItem
        dbData={getDataForPage(currentPage, dbData)}
      ></UserTrainingItem>
    </UserTrainingsTable>
  );
}

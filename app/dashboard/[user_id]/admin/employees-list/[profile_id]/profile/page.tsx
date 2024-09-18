"use server";

import {
  getAllUserTrainings,
  UserTrainingType,
} from "@/lib/models/UserTraining";
import UserTrainingItem from "@/components/trainings/user-training-item";
import UserTrainingsTable from "@/components/trainings/user-trainings-table";
import AdminProfileViewer from "@/components/employees/admin-profile-viewer";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    user_id?: string;
  };
}) {
  const user_id = searchParams?.user_id;
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch user training data only if user_id is provided
  const userTrainingData: UserTrainingType[] | null = user_id
    ? await getAllUserTrainings(user_id, query)
    : null;

  // Helper function to handle pagination logic
  function getDataForPage(pageNumber: number, data: UserTrainingType[]) {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    return data.slice(startIndex, endIndex);
  }

  return (
    <AdminProfileViewer>
      <UserTrainingsTable
        tableHeaders={["Training", "Date of Completion", "Actions"]}
        dbData={userTrainingData!}
        currentPage={currentPage}
        noModal={true}
      >
        {userTrainingData && (
          <UserTrainingItem
            dbData={getDataForPage(currentPage, userTrainingData)}
          />
        )}
      </UserTrainingsTable>
    </AdminProfileViewer>
  );
}

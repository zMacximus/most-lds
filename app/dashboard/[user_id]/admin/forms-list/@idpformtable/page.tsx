import { getAllAdminForms } from "@/lib/models/AdminForm";
import IdpFormTable from "@/components/forms/idp-form-table";
import IdpFormItem from "@/components/forms/idp-form-item";
import { getAllIDPForms, getIDPFormsByNotedBy } from "@/lib/models/IDPForm";
import { getUserFullName } from "@/lib/models/User";
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

  // const dbData = await getAllIDPForms(query);
  const userFullName = await getUserFullName(getUserCookie()!);
  const dbData = await getIDPFormsByNotedBy(userFullName!);

  function getDataForPage(pageNumber: number, data: any[]) {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    return data.slice(startIndex, endIndex);
  }
  const headers = ["Submitted by", "Submitted on", "Status", "Action"];
  return (
    <>
      {/* {dbData.length > 0 ? ( */}
      <IdpFormTable
        tableHeaders={headers}
        dbData={dbData}
        currentPage={currentPage}
      >
        <IdpFormItem dbData={getDataForPage(currentPage, dbData)}></IdpFormItem>
      </IdpFormTable>
      {/* ) : (
        <p>LOAD SOME DATA</p>
      )} */}
    </>
  );
}

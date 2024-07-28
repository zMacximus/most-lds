import IdpFormItem from "@/components/forms/idp-form-item";
import UserIDPFormTable from "@/components/development-plan/user-idp-form-table";
import { getAllIDPForms, getUserIDPForms } from "@/lib/models/IDPForm";
import { getUserCookie } from "@/server/services/cookies";
import UserIDPFormItem from "@/components/development-plan/user-idp-form-item";

export default async function Page() {
  return <></>;
}

// export default async function Page({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) {
//   const query = searchParams?.query || "";
//   const currentPage = Number(searchParams?.page) || 1;

//   const username = getUserCookie()!;
//   console.log(username);

//   const dbData = await getUserIDPForms(username, query);
//   //   const dbData = [];

//   function getDataForPage(pageNumber: number, data: any[]) {
//     const startIndex = (pageNumber - 1) * 5;
//     const endIndex = startIndex + 5;
//     return data.slice(startIndex, endIndex);
//   }
//   const headers = ["Submitted on", "Reviewed on", "Status", "Action"];
//   return (
//     <UserIDPFormTable
//       tableHeaders={headers}
//       dbData={dbData}
//       currentPage={currentPage}
//     >
//       <UserIDPFormItem
//         dbData={getDataForPage(currentPage, dbData)}
//       ></UserIDPFormItem>
//     </UserIDPFormTable>
//   );
// }

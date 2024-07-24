"use server";
import { getUserFullName, isUserAdmin } from "@/lib/models/User";
import FormStatusBadge from "./form-status-badge";
import { format } from "date-fns";
import { IDPFormType } from "@/lib/models/IDPForm";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
import NewIDPForm from "../development-plan/new-idp-form";
import DeleteContentForm from "../e-lib/delete-content-modal";
import { getUserCookie } from "@/server/services/cookies";

function formatDate(date: Date): string {
  return format(date, "MM-dd-yyyy");
}

export default async function IdpFormItem({
  dbData,
}: {
  dbData: IDPFormType[];
}) {
  // const pathName = usePathname();

  const isAdmin = await isUserAdmin(getUserCookie()!);

  if (dbData.length <= 0)
    return <h1 className='text-5xl'>ERROR 404: No Data Found</h1>;
  return (
    <>
      {dbData.map(async (data) => {
        const fullName = await getUserFullName(data.submittedBy);
        // console.log(
        //   data.submissionDate + "________" + formatDate(data.submissionDate)
        // );
        return (
          <>
            <div
              key={data.id}
              className='flex flex-row border-solid border-1 border-gray-400 rounded-full text-center overflow-ellipsis'
            >
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {/* {getUserFullName(data.submittedBy)} */}
                {/* <p className='truncate text-ellipsis w-[135px]'> */}
                {getUserFullName(data.submittedBy)}
                {/* </p> */}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {formatDate(data.submissionDate)}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {/* {data.formStatus.toString()} */}
                <FormStatusBadge status={data.formStatus}></FormStatusBadge>
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <div className='flex flex-row'>
                  <AccordionModalFormButton buttonIcon={"eye"}>
                    <NewIDPForm
                      user_id={data.submittedBy}
                      user_name={fullName!}
                      loadData={true}
                      dataToLoad={data}
                      readOnly={true}
                      adminAccess={isAdmin!}
                    ></NewIDPForm>
                  </AccordionModalFormButton>
                  <AccordionModalFormButton
                    buttonIcon={"trash"}
                    buttonSize='md'
                  >
                    <DeleteContentForm
                      content_id={data.id}
                      user_id={""}
                      contentType={"idp"}
                    ></DeleteContentForm>
                  </AccordionModalFormButton>
                </div>
              </div>
            </div>
            <div className='py-1'></div>
          </>
        );
      })}
    </>
  );
}

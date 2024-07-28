import {
  PencilIcon,
  InformationCircleIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminFormType } from "@/lib/models/AdminForm";
import { getUserFullName } from "@/lib/models/User";
import { format } from "date-fns";
import FormStatusBadge from "../forms/form-status-badge";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
import NewAdminLndForm from "../forms/new-admin-lnd-form";

function formatDate(date: Date): string {
  return format(date, "MM-dd-yyyy");
}

export default function UserLDFormItem({
  dbData,
}: {
  dbData: AdminFormType[];
}) {
  // const pathName = usePathname();
  if (dbData.length <= 0)
    return (
      <div className='flex flex-row h-full w-full justify-center items-center'>
        ERROR 404: Data Not Found
      </div>
    );
  return (
    <>
      {dbData.map((data) => {
        // console.log(
        //   data.submissionDate + "________" + formatDate(data.submissionDate)
        // );
        return (
          <>
            <div
              key={data.id}
              className='flex flex-row h-[70px] border-solid border-1 border-gray-400 rounded-full text-center'
            >
              <div className='p-2 flex flex-[1] justify-center items-center border-dashed border- border-red-600'>
                <p className='truncate text-ellipsis w-[135px]'>
                  {data.titleOfLD}
                </p>
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {/* {getUserFullName(data.submittedBy)} */}
                {data.employeeName}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {/* {getUserFullName(data.submittedBy)} */}
                {data.officerInCharge}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {formatDate(data.submissionDate)}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {formatDate(data.dateOfLD)}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {/* {data.formStatus.toString()} */}
                <FormStatusBadge status={data.formStatus}></FormStatusBadge>
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <div className='flex flex-row'>
                  <AccordionModalFormButton buttonIcon={"eye"}>
                    <NewAdminLndForm
                      user_id={""}
                      loadData={true}
                      dataToLoad={data}
                      readOnly={true}
                    ></NewAdminLndForm>
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

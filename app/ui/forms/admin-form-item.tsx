import {
  PencilIcon,
  InformationCircleIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminFormType, signColumnChecker } from "@/lib/models/AdminForm";
import { getUserFullName, isUserAdmin } from "@/lib/models/User";
import FormStatusBadge from "./form-status-badge";
import { format } from "date-fns";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
import NewAdminLndForm from "./new-admin-lnd-form";
import { getUserCookie } from "@/server/services/cookies";

function formatDate(date: Date): string {
  return format(date, "MM-dd-yyyy");
}

export default async function AdminFormItem({
  dbData,
  fullName,
}: {
  dbData: AdminFormType[];
  fullName?: string;
}) {
  // const pathName = usePathname();
  const adminStatus = await isUserAdmin(getUserCookie()!);
  if (dbData.length <= 0)
    return (
      <div className='flex flex-row h-full w-full justify-center items-center'>
        ERROR 404: Data Not Found
      </div>
    );
  return (
    <>
      {dbData.map(async (data) => {
        // console.log(
        //   data.submissionDate + "________" + formatDate(data.submissionDate)
        // );

        const signStatus = await signColumnChecker(fullName!, data.id);
        console.log(signStatus);
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
                <FormStatusBadge
                  status={signStatus.signStatus!}
                ></FormStatusBadge>
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <div className='flex flex-row'>
                  {/* <div className="px-2"></div>
                                <Link href=""><PlusCircleIcon width={30}></PlusCircleIcon></Link> */}

                  {/* <Link href=''>
                    <InformationCircleIcon width={30}></InformationCircleIcon>
                  </Link>
                  <div className='px-2'></div> */}
                  <AccordionModalFormButton buttonIcon={"eye"}>
                    <NewAdminLndForm
                      user_id={""}
                      loadData={true}
                      dataToLoad={data}
                      readOnly={true}
                      adminStatus={adminStatus!}
                      fullName={fullName}
                    ></NewAdminLndForm>
                  </AccordionModalFormButton>
                  {/* <Link href=''>
                    <EyeIcon width={30}></EyeIcon>
                  </Link>
                  <div className='px-2'></div>
                  <Link href=''>
                    <TrashIcon
                      width={30}
                      className='text-danger-500'
                    ></TrashIcon>
                  </Link> */}
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

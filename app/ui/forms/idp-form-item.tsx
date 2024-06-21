import {
  PencilIcon,
  InformationCircleIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminFormType } from "@/lib/models/AdminForm";
import { getUserFullName } from "@/lib/models/User";
import FormStatusBadge from "./form-status-badge";
import { format } from "date-fns";

function formatDate(date: Date): string {
  return format(date, "MM-dd-yyyy");
}

export default function IdpFormItem({ dbData }: { dbData: AdminFormType[] }) {
  // const pathName = usePathname();
  if (dbData === undefined)
    return <h1 className='text-5xl'>LOAD SOME DATA LMAO</h1>;
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
              className='flex flex-row border-solid border-1 border-gray-400 rounded-full text-center overflow-ellipsis'
            >
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {/* {getUserFullName(data.submittedBy)} */}
                {/* <p className='truncate text-ellipsis w-[135px]'> */}
                {data.employeeName}
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
                  {/* <div className="px-2"></div>
                                  <Link href=""><PlusCircleIcon width={30}></PlusCircleIcon></Link> */}

                  {/* <Link href=''>
                      <InformationCircleIcon width={30}></InformationCircleIcon>
                    </Link>
                    <div className='px-2'></div> */}
                  <Link href=''>
                    <EyeIcon width={30}></EyeIcon>
                  </Link>
                  <div className='px-2'></div>
                  <Link href=''>
                    <TrashIcon
                      width={30}
                      className='text-danger-500'
                    ></TrashIcon>
                  </Link>
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

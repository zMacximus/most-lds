import { format } from "date-fns";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
import { UserTrainingType } from "@/lib/models/UserTraining";
import NewUserTrainingForm from "./new-user-training-form";

function formatDate(date: Date): string {
  return format(date, "MM-dd-yyyy");
}

export default function UserTrainingItem({
  dbData,
}: {
  dbData: UserTrainingType[];
}) {
  // const pathName = usePathname();
  if (dbData.length <= 0)
    return (
      <div className="flex flex-row h-full w-full justify-center items-center">
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
              className="flex flex-row h-[70px] border-solid border-1 border-gray-400 rounded-full text-center"
            >
              <div className="p-2 flex flex-[1] justify-center items-center border-dashed border- border-red-600">
                <p className="truncate text-ellipsis w-[135px]">{data.name}</p>
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                {/* {getUserFullName(data.submittedBy)} */}
                {formatDate(data.dateOfTraining)}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className="p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600">
                <div className="flex flex-row">
                  <AccordionModalFormButton buttonIcon={"eye"}>
                    <NewUserTrainingForm
                      user_id={""}
                      loadData={true}
                      dataToLoad={data}
                      readOnly={true}
                    ></NewUserTrainingForm>
                  </AccordionModalFormButton>
                </div>
              </div>
            </div>
            <div className="py-1"></div>
          </>
        );
      })}
    </>
  );
}

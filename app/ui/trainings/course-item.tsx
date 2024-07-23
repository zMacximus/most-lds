"use server";

import StatusBadge from "@/components/status-badge";
import { TrainingType } from "@/lib/models/Training";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
import NewTrainingForm from "./new-training-form";
import DeleteContentForm from "../e-lib/delete-content-modal";

export default async function CourseItem({
  dbData,
}: {
  dbData: TrainingType[];
}) {
  // const pathName = usePathname();
  if (dbData.length <= 0)
    return (
      <div className='flex justify-center items-center h-full'>
        <h1 className='text-2xl'>404: No Data Found</h1>
      </div>
    );
  return (
    <>
      {dbData.map((data) => {
        return (
          <>
            <div
              key={data.id}
              className='flex flex-row border-solid border-1 border-gray-400 rounded-full'
            >
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.code}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.title}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.modality}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <StatusBadge status={Boolean(data.status)}></StatusBadge>
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.currentPopulation}/{data.maxPopulation}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <div className='flex flex-row'>
                  <AccordionModalFormButton buttonIcon={"pencil"}>
                    <NewTrainingForm
                      loadData={true}
                      dataToLoad={data}
                    ></NewTrainingForm>
                  </AccordionModalFormButton>
                  <AccordionModalFormButton
                    buttonIcon={"trash"}
                    buttonSize='md'
                  >
                    <DeleteContentForm
                      content_id={data.id}
                      user_id={""}
                      contentType={"training"}
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

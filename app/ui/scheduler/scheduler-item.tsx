"use client";
import Image from "next/image";
import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import placeholderMan from "public/placeholder/Placeholder-Man.jpg";
import genericUser from "public/placeholder/generic-user.png";
import Link from "next/link";
import { EmployeeFormInput, employeeListData } from "@/lib/definitions";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import AccordionModalFormButton from "../e-lib/accordion-modal-button";
// import NewEmployeeForm from "./new-eployee-form";
import DeleteContentForm from "../e-lib/delete-content-modal";
import NewScheduleForm from "./new-schedule-form";
import { ScheduleType } from "@/lib/models/Schedule";
import { format } from "date-fns";
import { TrainingType } from "@/lib/models/Training";
// import { useState } from "react";

function formatDate(date: Date): string {
  return format(date, "MM-dd-yyyy");
}

export default function SchedulerItem({
  dbData,
  fieldData,
}: {
  dbData: ScheduleType[];
  fieldData: TrainingType[];
}) {
  // console.log(placeholderMan.src);
  // const searchParams = new URLSearchParams();
  const router = useRouter();
  if (dbData.length <= 0) {
    return (
      <div className='flex flex-row h-full w-full justify-center items-center'>
        ERROR 404: Data Not Found
      </div>
    );
  } else {
    return (
      <>
        {dbData.map((data) => {
          // console.log(data);

          return (
            <div
              key={`${data.title}` + `_${data}`}
              className='flex flex-row border-solid border-1 border-gray-400 rounded-full'
            >
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.title}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {formatDate(data.startDate)}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {formatDate(data.endDate)}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <div className='flex flex-row'>
                  <AccordionModalFormButton buttonIcon={"pencil"}>
                    <NewScheduleForm
                      loadData={true}
                      dataToLoad={data}
                      fieldData={fieldData}
                      categoryName={""}
                      user_id={""}
                    ></NewScheduleForm>
                  </AccordionModalFormButton>
                  <AccordionModalFormButton
                    buttonIcon={"trash"}
                    buttonSize='md'
                  >
                    <DeleteContentForm
                      content_id={data.id}
                      contentType={"schedule"}
                      user_id={""}
                    ></DeleteContentForm>
                  </AccordionModalFormButton>
                </div>
              </div>
            </div>
          );
        })}
        <div className='py-1'></div>
      </>
    );
  }
}

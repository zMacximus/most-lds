"use server";
import { Spacer } from "@nextui-org/react";
import EmployeeFormButton from "../modal-form-button";
import SearchBar from "../searchbar";
import CustomPagination from "../pagination";
import ModalFormButton from "../modal-form-button";
import NewEmployeeForm from "../employees/new-eployee-form";
import NewScheduleForm from "./new-schedule-form";

export default async function ScheduleTable({
  children,
  tableHeaders,
  dbData,
  currentPage,
}: {
  children: React.ReactNode;
  tableHeaders: string[];
  dbData: any[];
  currentPage: number;
}) {
  return (
    <div className='p-5 flex flex-row w-full h-[calc(100vh*0.8)] bg-white drop-shadow-md rounded-3xl border-dashed border- border-green-600'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row'>
          <SearchBar></SearchBar>
          <Spacer x={5}></Spacer>
          <ModalFormButton buttonName={"Add Schedule"}>
            <NewScheduleForm categoryName={""} user_id={""}></NewScheduleForm>
          </ModalFormButton>
        </div>
        <div className='py-5 flex flex-row border-solid border- border-black'>
          {tableHeaders.map((header, index) => (
            <div
              className={`flex flex-1 justify-center items-center border-dashed border- border-red-600`}
            >
              {header}
            </div>
          ))}
        </div>
        <div className='h-full border- border-solid border-black'>
          {children}
        </div>
        <div className='flex flex-row justify-center items-center py-3 border-solid border- border-black'>
          <CustomPagination
            currentPage={currentPage}
            tableLength={dbData.length}
          />
        </div>
      </div>
    </div>
  );
}

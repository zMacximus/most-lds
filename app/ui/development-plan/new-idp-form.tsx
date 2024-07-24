"use client";
import { IDPFormInput } from "@/lib/definitions";
import { changeStatus, IDPFormType } from "@/lib/models/IDPForm";
import {
  newIDPFormHandler,
  validateFormInput,
} from "@/server/services/idpFormHandler";
// import { getUserFullName } from "@/lib/models/User";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  Button,
  DatePicker,
  DateValue,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewIDPForm({
  user_id,
  user_name,
  loadData,
  dataToLoad,
  readOnly,
  adminAccess,
}: {
  user_id: string;
  user_name: string;
  loadData?: boolean;
  dataToLoad?: IDPFormType;
  readOnly?: boolean;
  adminAccess?: boolean;
}) {
  const router = useRouter();
  const pathName = usePathname();

  // const [targetScheduleOfCompletion, setDateOfLD] = useState<DateValue>();
  const [targetScheduleOfCompletion, setDateOfLD] = useState<DateValue>();

  //   const [previousLDDate, setPreviousLDDate] = useState<DateValue>();

  //   const username = getUserCookie();

  const [inputs, setInputs] = useState<IDPFormInput>({
    name: user_name,
    submittedBy: user_id, // Replace with appropriate initial value if needed
    position: "",
    yearsInThePosition: 1.0,
    division: "",
    objectives: "",
    areasOfStrength: "",
    areasOfDevelopment: "",
    targetCompetencyTraining: "",
    targetScheduleOfCompletion: targetScheduleOfCompletion?.toDate(
      getLocalTimeZone()
    )!,
    formStatus: 1, // or set to `undefined` if you want it to be optional initially
    notedBy: "",
  });

  //   const [isFormValid, setIsFormValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value: string | number = event.target.value;

    if (name === "yearsInThePosition") {
      value = Number(value);
    }

    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleDateChange = (name: string, value: DateValue) => {
    setInputs((values) => ({
      ...values,
      [name]: value.toDate(getLocalTimeZone()),
    }));
  };

  useEffect(() => {
    if (loadData && dataToLoad) {
      // Ensure the date string is in a proper ISO 8601 format
      const targetDateStr = new Date(dataToLoad.targetScheduleOfCompletion)
        .toISOString()
        .split("T")[0];
      const parsedDate = parseDate(targetDateStr);
      setDateOfLD(parsedDate);
      setInputs({
        name: user_name,
        submittedBy: user_id,
        position: dataToLoad.position,
        yearsInThePosition: dataToLoad.yearsInThePosition,
        division: dataToLoad.division,
        objectives: dataToLoad.objectives,
        areasOfStrength: dataToLoad.areasOfStrength,
        areasOfDevelopment: dataToLoad.areasOfDevelopment,
        targetCompetencyTraining: dataToLoad.targetCompetencyTraining,
        targetScheduleOfCompletion: parsedDate.toDate(getLocalTimeZone())!,
        formStatus: dataToLoad.formStatus,
        notedBy: dataToLoad.notedBy,
      });
    }
  }, [loadData, dataToLoad]);

  let StatusCode: number;

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();
    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      if (loadData) {
        console.log("STATUS: ", StatusCode);
        await changeStatus(dataToLoad?.id!, StatusCode);
      } else {
        await newIDPFormHandler({ ...inputs });
      }
      onClose();
      router.push(pathName);
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          {loadData ? (
            <ModalHeader>
              Review Individual Personal Development Plan
            </ModalHeader>
          ) : (
            <ModalHeader>New Individual Personal Development Plan</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className='flex flex-row justify-center items-center'>
                <Input
                  id='employeeName'
                  name='employeeName'
                  //   isRequired
                  isReadOnly
                  value={`${user_name}`}
                  onChange={handleInputChange}
                  placeholder='ex. Juan de la Cruz'
                  label='Employee Name'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='position'
                  name='position'
                  // isReadOnly
                  isRequired
                  value={inputs.position || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Records Officer II'
                  label='Position/Designation'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='yearsInThePosition'
                  name='yearsInThePosition'
                  isReadOnly
                  isRequired
                  value={inputs.yearsInThePosition.toString() || ""}
                  onChange={handleInputChange}
                  placeholder='ex. 3'
                  label='Years in the Position'
                  size='md'
                  labelPlacement='outside'
                  endContent={
                    <>
                      <p className='text-gray-600'>years</p>
                    </>
                  }
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='division'
                  name='division'
                  // isReadOnly
                  isRequired
                  value={inputs.division || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Records Section'
                  label='Division/Section/Unit'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Textarea
                  id='objectives'
                  name='objectives'
                  isReadOnly={readOnly}
                  isRequired
                  value={inputs.objectives || ""}
                  onChange={handleInputChange}
                  placeholder='ex. •To increase knowledge on technical writing skills'
                  label='Objectives'
                  size='md'
                  labelPlacement='outside'
                ></Textarea>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Textarea
                  id='areasOfStrength'
                  name='areasOfStrength'
                  isReadOnly={readOnly}
                  isRequired
                  value={inputs.areasOfStrength || ""}
                  onChange={handleInputChange}
                  placeholder='ex. •Time management skills;'
                  label='Areas of Strength'
                  size='md'
                  labelPlacement='outside'
                ></Textarea>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Textarea
                  id='areasOfDevelopment'
                  name='areasOfDevelopment'
                  isReadOnly={readOnly}
                  isRequired
                  value={inputs.areasOfDevelopment || ""}
                  onChange={handleInputChange}
                  placeholder='ex. •I also would like to build my confidence when presenting to my immediate supervisors.'
                  label='Areas for Development'
                  size='md'
                  labelPlacement='outside'
                ></Textarea>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Textarea
                  id='targetCompetencyTraining'
                  name='targetCompetencyTraining'
                  isReadOnly={readOnly}
                  isRequired
                  value={inputs.targetCompetencyTraining || ""}
                  onChange={handleInputChange}
                  placeholder='ex. •Supervisory Development Training'
                  label='Target Competency Training'
                  size='md'
                  labelPlacement='outside'
                ></Textarea>
              </div>
              <div className='flex flex-row justify-center items-end mt-5'>
                {/* <Textarea
                  id='targetCompetencyTraining'
                  name='targetCompetencyTraining'
                  isRequired
                  value={inputs.targetCompetencyTraining || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Jose Laure'
                  label='Target Competency Training'
                  size='md'
                  labelPlacement='outside'
                ></Textarea> */}
                <DatePicker
                  id='targetScheduleOfCompletion'
                  name='targetScheduleOfCompletion'
                  isReadOnly={readOnly}
                  isRequired
                  label='Target Schedule Of Completion'
                  labelPlacement='outside'
                  size='md'
                  className='max-w-[200px]'
                  value={targetScheduleOfCompletion}
                  showMonthAndYearPickers
                  onChange={(date) => {
                    setDateOfLD(date);
                    handleDateChange("targetScheduleOfCompletion", date);
                  }}
                />
                <Spacer x={4}></Spacer>
                <Input
                  id='notedBy'
                  name='notedBy'
                  isReadOnly={readOnly}
                  isRequired
                  value={inputs.notedBy || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Juan de la Cruz'
                  label='Immediate Supervisor'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div>
              <ModalFooter>
                {loadData && dataToLoad && readOnly && !adminAccess ? (
                  // <Button color='danger' variant='light' onPress={onClose}>
                  //   Cancel
                  // </Button>
                  <></>
                ) : (
                  <Button color='danger' variant='light' onPress={onClose}>
                    Cancel
                  </Button>
                )}
                {loadData && dataToLoad && readOnly && adminAccess ? (
                  <>
                    <Button
                      color='danger'
                      type='submit'
                      onPress={() => (StatusCode = 0)}
                    >
                      Deny
                    </Button>
                    <Button
                      color='primary'
                      type='submit'
                      onPress={() => (StatusCode = 2)}
                    >
                      Approve
                    </Button>
                  </>
                ) : loadData && dataToLoad && readOnly && !adminAccess ? (
                  <>
                    <Button color='danger' type='submit' onPress={onClose}>
                      Close
                    </Button>
                  </>
                ) : (
                  <Button color='primary' type='submit'>
                    Submit
                  </Button>
                )}
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

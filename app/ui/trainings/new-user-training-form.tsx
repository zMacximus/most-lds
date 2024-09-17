"use client";
import { AdminFormInput, UserTrainingInput } from "@/lib/definitions";
import { AdminFormType, updateApproval } from "@/lib/models/AdminForm";
import { UserTrainingType } from "@/lib/models/UserTraining";
import {
  newUserTrainingFormHandler,
  validateFormInput,
} from "@/server/services/userTrainingFormHandler";
// import {
//   newAdminFormHandler,
//   validateFormInput,
// } from "@/server/services/adminFormHandler";
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
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewUserTrainingForm({
  user_id,
  loadData,
  dataToLoad,
  readOnly,
  adminStatus,
  fullName,
}: {
  user_id: string;
  loadData?: boolean;
  dataToLoad?: UserTrainingType;
  readOnly?: boolean;
  adminStatus?: boolean;
  fullName?: string;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [dateOfTraining, setDateOfTraining] = useState<DateValue>();
  //   const [previousLDDate, setPreviousLDDate] = useState<DateValue>();

  const [inputs, setInputs] = useState<UserTrainingInput>({
    name: "",
    dateOfTraining: new Date(),
    employee: user_id,
  });

  //   const [isFormValid, setIsFormValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value: string | number = event.target.value;

    if (name === "numberOfHours") {
      value = Number(value);
    }

    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //   const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     console.log(`${name} = ${value}`);
  //     setInputs((values) => ({ ...values, [name]: value }));
  //   };

  const handleDateChange = (name: string, value: DateValue) => {
    console.log(`${name} = ${value}`);
    setInputs((values) => ({
      ...values,
      [name]: value.toDate(getLocalTimeZone()),
    }));
  };

  //   const handleRadioChange = (name: string, value: string) => {
  //     console.log(`${name} = ${value}`);
  //     setInputs((values) => ({ ...values, [name]: value === "true" }));
  //   };

  //   const handleCheckboxChange = (name: string, value: boolean) => {
  //     console.log(`${name} = ${value}`);
  //     setInputs((values) => ({ ...values, [name]: value }));
  //   };

  useEffect(() => {
    if (loadData && dataToLoad) {
      const d = dataToLoad;
      setInputs({
        name: d.name,
        dateOfTraining: new Date(d.dateOfTraining),
        employee: d.employee,
      });
    }
  }, [loadData, dataToLoad]);

  let statusCode: number;

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();
    // if (!inputs.recentLD) {
    //   inputs.previousLD = null;
    //   inputs.previousLDDate = null;
    //   inputs.previousLDVenue = null;
    //   inputs.prevLDPostFormSubmitted = null;
    // }

    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      if (loadData) {
        if (adminStatus) {
          console.log(fullName);
          await updateApproval(dataToLoad?.id!, fullName!, statusCode);
        }
      } else {
        await newUserTrainingFormHandler({ ...inputs });
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
              Review Learning and Development Participation Request Form
            </ModalHeader>
          ) : (
            <ModalHeader>
              New Learning and Development Participation Request Form
            </ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className="flex flex-row justify-center items-center">
                <Input
                  id="name"
                  name="name"
                  isRequired
                  isReadOnly={readOnly}
                  value={inputs.name || ""}
                  onChange={handleInputChange}
                  placeholder="ex. Records Section"
                  label="Name of Training"
                  size="md"
                  labelPlacement="outside"
                ></Input>
                <Spacer x={4}></Spacer>
                <DatePicker
                  id="dateOfTraining"
                  name="dateOfTraining"
                  isRequired
                  isReadOnly={readOnly}
                  label="Date of Activity"
                  labelPlacement="outside"
                  size="md"
                  className="max-w-[200px]"
                  value={parseDate(
                    inputs.dateOfTraining.toISOString().split("T")[0]
                  )}
                  onChange={(date) => {
                    setDateOfTraining(date);
                    handleDateChange("dateOfTraining", date);
                  }}
                ></DatePicker>
              </div>
              <ModalFooter>
                {loadData && dataToLoad && readOnly && adminStatus ? (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      type="submit"
                      onPress={() => (statusCode = 0)}
                    >
                      Deny
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      onPress={() => (statusCode = 2)}
                    >
                      Approve
                    </Button>
                  </>
                ) : loadData && dataToLoad && readOnly && !adminStatus ? (
                  <>
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </>
                )}
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

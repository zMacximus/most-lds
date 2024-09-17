"use client";
import { ScheduleFormInput } from "@/lib/definitions";
import { ScheduleType, updateSchedule } from "@/lib/models/Schedule";
import { TrainingType } from "@/lib/models/Training";
import {
  newScheduleHandler,
  validateFormInput,
} from "@/server/services/newScheduleFormHandler";
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
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewScheduleForm({
  categoryName,
  user_id,
  fieldData,
  loadData,
  dataToLoad,
}: {
  categoryName: string;
  user_id: string;
  fieldData: TrainingType[];
  loadData?: boolean;
  dataToLoad?: ScheduleType;
}) {
  console.log("TOPIC FORM USER: ", user_id);

  const router = useRouter();
  const pathName = usePathname();

  const [startDate, setStartDate] = useState<DateValue>();
  const [endDate, setEndDate] = useState<DateValue>();

  const [inputs, setInputs] = useState<ScheduleFormInput>({
    // id: "",
    title: "",
    subtitle: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    training_id: Number(),
    scheduledBy: user_id,
  });

  const handleDateChange = (name: string, value: DateValue) => {
    console.log(`${name} = ${value}`);
    setInputs((values) => ({
      ...values,
      [name]: value.toDate(getLocalTimeZone()),
    }));
  };

  useEffect(() => {
    if (loadData && dataToLoad) {
      setInputs({
        title: dataToLoad.title,
        subtitle: dataToLoad.subtitle,
        description: dataToLoad.description,
        startDate: new Date(dataToLoad.startDate),
        endDate: new Date(dataToLoad.endDate),
        training_id: dataToLoad.training_id,
        scheduledBy: dataToLoad.scheduledBy,
      });
    }
  }, [loadData, dataToLoad]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const selectTrainingHandler = (event: any, code: string, id: number) => {
    setInputs((values) => ({ ...values, subtitle: code, training_id: id }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();
    console.log({ ...inputs });
    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      if (loadData) {
        await updateSchedule(dataToLoad?.id!, inputs);
      } else {
        await newScheduleHandler({ ...inputs });
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
            <ModalHeader>Edit Schedule Form</ModalHeader>
          ) : (
            <ModalHeader>New Schedule Form</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className="flex flex-row justify-center items-center">
                {/* <Select
                  items={fieldData}
                  selectedKeys={inputs.title != "" ? [inputs.title] : undefined}
                  onChange={(event) =>
                    handleSelectChange(event as ChangeEvent<HTMLSelectElement>)
                  }
                  id="title"
                  name="title"
                  placeholder="Select Training"
                  label="Training Title"
                  size="md"
                  labelPlacement="outside"
                  isRequired
                >
                  {(item) => (
                    <SelectItem
                      key={`${item.title}`}
                      onPress={(e) =>
                        selectTrainingHandler(e, item.code, item.id)
                      }
                      // value={`${item.title}_${item.code}_${item.id}`}
                    >
                      {item.title}
                    </SelectItem>
                  )}
                </Select> */}
                <Input
                  id="title"
                  name="title"
                  // isRequired
                  value={inputs.title}
                  onChange={handleInputChange}
                  placeholder="ex. Gender Sensitivity"
                  label="Title of Training"
                  size="md"
                  labelPlacement="outside"
                ></Input>
                <Spacer x={4}></Spacer>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  isRequired
                  value={parseDate(
                    inputs.startDate.toISOString().split("T")[0]
                  )}
                  onChange={(date) => {
                    setStartDate(date);
                    handleDateChange("startDate", date);
                  }}
                  // placeholder='ex. Gender Sensitivity Training'
                  label="Start Date"
                  size="md"
                  labelPlacement="outside"
                ></DatePicker>
                <Spacer x={4}></Spacer>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  isRequired
                  value={parseDate(inputs.endDate.toISOString().split("T")[0])}
                  onChange={(date) => {
                    setEndDate(date);
                    handleDateChange("endDate", date);
                  }}
                  // placeholder='ex. Course Code'
                  label="End Date"
                  size="md"
                  labelPlacement="outside"
                ></DatePicker>
                {/* <Spacer x={4}></Spacer>
                <Input
                  id='subtitle'
                  name='subtitle'
                  // isRequired
                  value={inputs.subtitle}
                  onChange={handleInputChange}
                  placeholder='ex. Course Code'
                  label='Subtitle (Optional)'
                  size='md'
                  labelPlacement='outside'
                ></Input> */}
              </div>
              {/* <div className='flex flex-row justify-center items-center mt-5'>
                <Input
                  id='description'
                  name='description'
                  // isRequired
                  value={inputs.description}
                  onChange={handleInputChange}
                  placeholder='ex. Short Description'
                  label='Description (Optional)'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div> */}
              {/* <div className='flex flex-row justify-center items-center mt-5'>
                <DatePicker
                  id='startDate'
                  name='startDate'
                  isRequired
                  value={parseDate(
                    inputs.startDate.toISOString().split("T")[0]
                  )}
                  onChange={(date) => {
                    setStartDate(date);
                    handleDateChange("startDate", date);
                  }}
                  // placeholder='ex. Gender Sensitivity Training'
                  label='Start Date'
                  size='md'
                  labelPlacement='outside'
                ></DatePicker>
                <Spacer x={4}></Spacer>
                <DatePicker
                  id='endDate'
                  name='endDate'
                  isRequired
                  value={parseDate(inputs.endDate.toISOString().split("T")[0])}
                  onChange={(date) => {
                    setEndDate(date);
                    handleDateChange("endDate", date);
                  }}
                  // placeholder='ex. Course Code'
                  label='End Date'
                  size='md'
                  labelPlacement='outside'
                ></DatePicker>
              </div> */}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

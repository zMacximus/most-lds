"use client";
import { EmployeeFormInput } from "@/lib/definitions";
import { newEmployeeHandler } from "@/server/services/employeeFormHandler";
import { getLocalTimeZone } from "@internationalized/date";
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
  Switch,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function NewEmployeeForm() {
  const router = useRouter();
  const pathName = usePathname();

  const [birthday, setBirthDay] = useState<DateValue>();
  const [joinDate, setJoinDate] = useState<DateValue>();
  const fileInput = useRef<HTMLInputElement>(null);

  const [inputs, setInputs] = useState<EmployeeFormInput>({
    firstName: "",
    lastName: "",
    birthDay: birthday?.toDate(getLocalTimeZone())!,
    address: "",
    religion: "",
    department: "",
    title: "",
    admin: false,
    joinDate: joinDate?.toDate(getLocalTimeZone())!,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleDateChange = (name: string, value: DateValue) => {
    setInputs((values) => ({
      ...values,
      [name]: value.toDate(getLocalTimeZone()),
    }));
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;
    setInputs((values) => ({ ...values, [name]: checked }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const firstNameInitials = inputs.firstName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .map((name) => name[0].toLowerCase())
      .join("");

    const lastNamePart = inputs.lastName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .join("");

    const username = `${firstNameInitials}${lastNamePart}`;

    const formData = new FormData();
    const file = fileInput?.current?.files?.[0]!;

    formData.append("file", file);
    formData.append("username", username);

    //DISABLE API CALLS FOR NOW

    // const response = await fetch("/api/image-upload", {
    //   method: "POST",
    //   body: formData,
    // });
    // const result = await response.json();
    // console.log(result);

    await newEmployeeHandler({ ...inputs });
    router.push(pathName);
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>New User Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col flex-shrink border-soli border- border-black'>
                  <label className='mb-4 text-sm'>Profile Picture</label>
                  <input
                    id='profileImage'
                    type='file'
                    name='file'
                    ref={fileInput}
                  ></input>
                </div>
                <Spacer x={4}></Spacer>
                <Input
                  id='firstName'
                  name='firstName'
                  isRequired
                  value={inputs.firstName || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Juan'
                  label='First Name'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='lastName'
                  name='lastName'
                  isRequired
                  value={inputs.lastName || ""}
                  onChange={handleInputChange}
                  placeholder='ex. de la Cruz'
                  label='Last Name'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <DatePicker
                  id='birthDay'
                  name='birthDay'
                  isRequired
                  label='Birthday'
                  labelPlacement='outside'
                  size='md'
                  className='max-w-[250px]'
                  value={birthday}
                  onChange={(date) => {
                    setBirthDay(date);
                    handleDateChange("birthDay", date);
                  }}
                ></DatePicker>
                <Spacer x={4}></Spacer>
                <Input
                  id='address'
                  name='address'
                  isRequired
                  value={inputs.address || ""}
                  onChange={handleInputChange}
                  placeholder='ex. 123 Di Makita St., Not Real City'
                  label='Address'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Select
                  id='department'
                  name='department'
                  isRequired
                  label='Department'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Operations'
                  onChange={handleSelectChange}
                >
                  <SelectItem key={"Admin"}>Admin</SelectItem>
                  <SelectItem key={"Finance"}>Finance</SelectItem>
                  <SelectItem key={"Operations"}>Operations</SelectItem>
                  <SelectItem key={"RDS"}>RDS</SelectItem>
                  <SelectItem key={"TMOS"}>TMOS</SelectItem>
                </Select>
                <Spacer x={4}></Spacer>
                <Input
                  id='title'
                  name='title'
                  isRequired
                  value={inputs.title || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Supervisor'
                  label='Title'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Select
                  id='religion'
                  name='religion'
                  isRequired
                  label='Religion'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Islam'
                  onChange={handleSelectChange}
                >
                  <SelectItem key={"Islam"}>Islam</SelectItem>
                  <SelectItem key={"Roman Catholic"}>Roman Catholic</SelectItem>
                  <SelectItem key={"Christianity"}>Christianity</SelectItem>
                  <SelectItem key={"Other"}>Other</SelectItem>
                </Select>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <DatePicker
                  id='joinDate'
                  name='joinDate'
                  isRequired
                  label='Join Date'
                  labelPlacement='outside'
                  size='md'
                  className='max-w-[250px]'
                  value={joinDate}
                  onChange={(date) => {
                    setJoinDate(date);
                    handleDateChange("joinDate", date);
                  }}
                ></DatePicker>
                <Spacer x={4}></Spacer>
                <div className='mt-5'>
                  <p className='mr-2'>Admin Authority</p>
                </div>
                <div className='mt-6'>
                  <Switch
                    id='admin'
                    name='admin'
                    size='lg'
                    onChange={handleSwitchChange}
                  />
                </div>
              </div>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button color='primary' type='submit' onPress={onClose}>
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

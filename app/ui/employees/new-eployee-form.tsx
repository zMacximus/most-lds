"use client";
import { EmployeeFormInput } from "@/lib/definitions";
import {
  newEmployeeHandler,
  validateFormInput,
} from "@/server/services/employeeFormHandler";
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
    email: "", // New field
    birthDay: birthday?.toDate(getLocalTimeZone())!,
    address: "",
    religion: "",
    department: "",
    title: "",
    employmentStatus: "", // New field
    phoneNumber: "", // New field
    maritalStatus: "", // New field
    admin: false,
    joinDate: joinDate?.toDate(getLocalTimeZone())!,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
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

    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      await newEmployeeHandler({ ...inputs });
      onClose();
      router.push(pathName);
    }

    // await newEmployeeHandler({ ...inputs });
    // router.push(pathName);
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>New User Form</ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
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
                  value={inputs.firstName}
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
                  value={inputs.lastName}
                  onChange={handleInputChange}
                  placeholder='ex. de la Cruz'
                  label='Last Name'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Input
                  id='email'
                  name='email'
                  isRequired
                  value={inputs.email}
                  onChange={handleInputChange}
                  placeholder='ex. juandelacruz123@gmail.com'
                  label='Email'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  isRequired
                  value={inputs.phoneNumber}
                  onChange={handleInputChange}
                  placeholder='ex. 915-xxx-xxxx'
                  label='Phone Number'
                  size='md'
                  labelPlacement='outside'
                  startContent={<p className='text-gray-700'>+63</p>}
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
                  value={inputs.address}
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
                  value={inputs.department}
                  onChange={(value) =>
                    handleSelectChange("department", value.target.value)
                  }
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
                  value={inputs.title}
                  onChange={handleInputChange}
                  placeholder='ex. Supervisor'
                  label='Title'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Select
                  id='employmentStatus'
                  name='employmentStatus'
                  isRequired
                  label='Employment Status'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Permanent'
                  value={inputs.employmentStatus}
                  onChange={(value) =>
                    handleSelectChange("employmentStatus", value.target.value)
                  }
                >
                  <SelectItem key={"Intern"}>Intern</SelectItem>
                  <SelectItem key={"Part-time"}>Part-time</SelectItem>
                  <SelectItem key={"Permanent"}>Permanent</SelectItem>
                  <SelectItem key={"Contractual"}>Contractual</SelectItem>
                  <SelectItem key={"Voluntary"}>Voluntary</SelectItem>
                </Select>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <Select
                  id='maritalStatus'
                  name='maritalStatus'
                  isRequired
                  label='Marital Status'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Married'
                  value={inputs.maritalStatus}
                  onChange={(value) =>
                    handleSelectChange("maritalStatus", value.target.value)
                  }
                >
                  <SelectItem key={"Single"}>Single</SelectItem>
                  <SelectItem key={"Taken"}>Taken</SelectItem>
                  <SelectItem key={"Married"}>Married</SelectItem>
                  <SelectItem key={"Separated"}>Separated</SelectItem>
                </Select>
                <Spacer x={4}></Spacer>
                <Select
                  id='religion'
                  name='religion'
                  isRequired
                  label='Religion'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Islam'
                  value={inputs.religion}
                  onChange={(value) =>
                    handleSelectChange("religion", value.target.value)
                  }
                >
                  <SelectItem key={"Islam"}>Islam</SelectItem>
                  <SelectItem key={"Roman Catholic"}>Roman Catholic</SelectItem>
                  <SelectItem key={"Christianity"}>Christianity</SelectItem>
                  <SelectItem key={"Other"}>Other</SelectItem>
                </Select>
                <Spacer x={4}></Spacer>
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
                    checked={inputs.admin}
                    onChange={handleSwitchChange}
                  />
                </div>
              </div>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button color='primary' type='submit'>
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

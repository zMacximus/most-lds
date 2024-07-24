"use client";
import { EmployeeFormInput } from "@/lib/definitions";
import { updateEmployee } from "@/lib/models/User";
import {
  newEmployeeHandler,
  validateFormInput,
} from "@/server/services/employeeFormHandler";
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
  Switch,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, Key, useEffect, useState } from "react";

export default function NewEmployeeForm({
  loadData,
  dataToLoad,
}: {
  loadData?: boolean;
  dataToLoad?: EmployeeFormInput;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [birthday, setBirthDay] = useState<DateValue>();
  const [joinDate, setJoinDate] = useState<DateValue>();
  // const fileInput = useRef<HTMLInputElement>(null);
  const [imgs, setImgs] = useState<string>("");

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
    //@ts-ignore
    image: null,
  });

  const handleProfileImageChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set the canvas dimensions to the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx!.drawImage(img, 0, 0);

        // Compress the image by exporting it with a lower quality setting (0.7)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setImgs(compressedDataUrl);
      };
      //@ts-ignore
      img.src = event.target!.result;
    };

    reader.readAsDataURL(file);
  };

  // console.log(imgs); // compressed base64 img

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // const handleSelectChange = (name: string, value: string) => {
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  const handleSelectChange = (name: string, keys: Iterable<Key>) => {
    const selectedValue = Array.from(keys).join(","); // Convert Iterable<Key> to string
    setInputs((values) => ({ ...values, [name]: selectedValue }));
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

  useEffect(() => {
    if (loadData && dataToLoad) {
      const data = dataToLoad;
      setBirthDay(parseDate(data.birthDay.toString())); // assuming data.birthDay is a valid date string or Date object
      setJoinDate(parseDate(data.joinDate.toString()));
      setInputs({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email, // New field
        birthDay: parseDate(data.birthDay.toString()).toDate(
          getLocalTimeZone()
        )!,
        address: data.address,
        religion: data.religion,
        department: data.department,
        title: data.title,
        employmentStatus: data.employmentStatus, // New field
        phoneNumber: data.phoneNumber, // New field
        maritalStatus: data.maritalStatus, // New field
        admin: data.admin,
        joinDate: parseDate(data.joinDate.toString()).toDate(
          getLocalTimeZone()
        )!,
        //@ts-ignore
        image: null,
      });
    }
  }, [loadData, dataToLoad]);

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();

    const updatedInputs = { ...inputs };
    if (imgs) {
      updatedInputs.image = imgs;
    }

    const firstNameInitials = inputs.firstName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .map((name) => name[0].toLowerCase())
      .join("");

    const lastNamePart = inputs.lastName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .join("");

    const username = `${firstNameInitials}${lastNamePart}`;

    const formData = new FormData();
    formData.append("username", username);

    if (await validateFormInput(updatedInputs)) {
      if (loadData) {
        await updateEmployee(dataToLoad?.username!, updatedInputs);
      } else {
        await newEmployeeHandler(updatedInputs);
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
            <ModalHeader>Edit User Form</ModalHeader>
          ) : (
            <ModalHeader>New User Form</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col flex-shrink border-soli border- border-black'>
                  <label className='mb-4 text-sm'>Profile Picture</label>
                  <input
                    id='profileImage'
                    type='file'
                    name='file'
                    //@ts-ignore
                    onChange={handleProfileImageChange}
                  />
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
                  selectedKeys={new Set([inputs.department])}
                  onSelectionChange={(keys) =>
                    handleSelectChange("department", keys)
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
                  selectedKeys={new Set([inputs.employmentStatus])}
                  onSelectionChange={(keys) =>
                    handleSelectChange("employmentStatus", keys)
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
                  selectedKeys={new Set([inputs.maritalStatus])}
                  onSelectionChange={(keys) =>
                    handleSelectChange("maritalStatus", keys)
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
                  selectedKeys={new Set([inputs.religion])}
                  onSelectionChange={(keys) =>
                    handleSelectChange("religion", keys)
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
                    isSelected={inputs.admin}
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

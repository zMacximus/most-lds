"use client";
import { AdminFormInput } from "@/lib/definitions";
import {
  newAdminFormHandler,
  validateFormInput,
} from "@/server/services/adminFormHandler";
import { getLocalTimeZone } from "@internationalized/date";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateValue,
  Divider,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spacer,
  Switch,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const EMPLOYMENT_STATUS = [
  { item: "Permanent" },
  { item: "Probationary" },
  { item: "Part-time" },
  { item: "Contractual" },
  { item: "Voluntary" },
];

const LD_MODE = [
  { item: "Internal L&D Activity" },
  { item: "External L&D Activity" },
];

const LD_LEVEL = [
  { item: "Local" },
  { item: "Regional" },
  { item: "National" },
  { item: "International" },
];

const LD_NATURE = [
  { item: "Participant" },
  { item: "Organizer" },
  { item: "Speaker/Presenter" },
  { item: "Facilitator" },
];

const LD_TYPE = [
  { item: "Managerial" },
  { item: "Technical" },
  { item: "Supervisory" },
  { item: "ADD MORE IF MORE" },
];

export default function NewAdminLndForm({ user_id }: { user_id: string }) {
  const router = useRouter();
  const pathName = usePathname();

  const [dateOfLD, setDateOfLD] = useState<DateValue>();
  const [previousLDDate, setPreviousLDDate] = useState<DateValue>();

  const [inputs, setInputs] = useState<AdminFormInput>({
    employeeName: "",
    division: "",
    position: "",
    employmentStatus: "",
    officerInCharge: "",
    titleOfLD: "",
    dateOfLD: new Date(),
    venue: "",
    numberOfHours: 16,
    serviceProvider: "",
    modeOfLD: "",
    level: "",
    natureOfParticipation: "",
    typeOfLD: "",
    sponsored: false,
    withinJobDesc: false,
    recentLD: false,
    previousLD: null,
    previousLDDate: null,
    previousLDVenue: null,
    prevLDPostFormSubmitted: null,
    postLDReEcho: false,
    postFormSubmission: false,
    submittedBy: user_id,
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

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleDateChange = (name: string, value: DateValue) => {
    console.log(`${name} = ${value}`);
    setInputs((values) => ({
      ...values,
      [name]: value.toDate(getLocalTimeZone()),
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value === "true" }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();
    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      await newAdminFormHandler({ ...inputs });
      onClose();
      router.push(pathName);
    } else {
      //   setIsFormValid(false);
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>
            New Learning and Development Participation Request Form
          </ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className='flex flex-row justify-center items-center'>
                <Input
                  id='employeeName'
                  name='employeeName'
                  isRequired
                  value={inputs.employeeName || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Juan de la Cruz'
                  label='Employee Name'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='division'
                  name='division'
                  isRequired
                  value={inputs.division || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Records Section'
                  label='Division/Section/Unit'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='position'
                  name='position'
                  isRequired
                  value={inputs.position || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Records Officer II'
                  label='Position/Designation'
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
                  onChange={(event) =>
                    handleSelectChange(
                      event as unknown as ChangeEvent<HTMLSelectElement>
                    )
                  }
                >
                  {EMPLOYMENT_STATUS.map((data) => (
                    <SelectItem key={data.item} value={data.item}>
                      {data.item}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Input
                  id='officerInCharge'
                  name='officerInCharge'
                  isRequired
                  value={inputs.officerInCharge || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Jose Laure'
                  label='Officer in Charge'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='titleOfLD'
                  name='titleOfLD'
                  isRequired
                  value={inputs.titleOfLD || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Gender Sensitivity Training'
                  label='Title of Learning & Development Activity'
                  size='md'
                  labelPlacement='outside'
                ></Input>
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <DatePicker
                  id='dateOfLD'
                  name='dateOfLD'
                  isRequired
                  label='Date of Activity'
                  labelPlacement='outside'
                  size='md'
                  className='max-w-[200px]'
                  value={dateOfLD}
                  onChange={(date) => {
                    setDateOfLD(date);
                    handleDateChange("dateOfLD", date);
                  }}
                ></DatePicker>
                <Spacer x={4}></Spacer>
                <Input
                  id='venue'
                  name='venue'
                  isRequired
                  value={inputs.venue || ""}
                  onChange={handleInputChange}
                  placeholder='ex. General Santos City'
                  label='Venue of Activity'
                  size='md'
                  labelPlacement='outside'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='numberOfHours'
                  name='numberOfHours'
                  isRequired
                  value={inputs.numberOfHours.toString() || ""}
                  onChange={handleInputChange}
                  placeholder='ex. 16'
                  label='Number of Hours'
                  size='md'
                  labelPlacement='outside'
                  endContent={
                    <>
                      <p className='text-gray-600'>hours</p>
                    </>
                  }
                  className='w-[500px]'
                ></Input>
                <Spacer x={4}></Spacer>
                <Input
                  id='serviceProvider'
                  name='serviceProvider'
                  isRequired
                  value={inputs.serviceProvider || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Bangsamoro Women Commission'
                  label='Learning Service Provider'
                  size='md'
                  labelPlacement='outside'
                  className='w-[1200px]'
                ></Input>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <Select
                  id='modeOfLD'
                  name='modeOfLD'
                  isRequired
                  label='Mode of the Activity'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. External L&D Activity'
                  onChange={(event) =>
                    handleSelectChange(
                      event as unknown as ChangeEvent<HTMLSelectElement>
                    )
                  }
                >
                  {LD_MODE.map((data) => (
                    <SelectItem key={data.item} value={data.item}>
                      {data.item}
                    </SelectItem>
                  ))}
                </Select>
                <Spacer x={4}></Spacer>
                <Select
                  id='level'
                  name='level'
                  isRequired
                  label='Level'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. National'
                  onChange={(event) =>
                    handleSelectChange(
                      event as unknown as ChangeEvent<HTMLSelectElement>
                    )
                  }
                >
                  {LD_LEVEL.map((data) => (
                    <SelectItem key={data.item} value={data.item}>
                      {data.item}
                    </SelectItem>
                  ))}
                </Select>
                <Spacer x={4}></Spacer>
                <Select
                  id='natureOfParticipation'
                  name='natureOfParticipation'
                  isRequired
                  label='Nature of Participation'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Organizer'
                  onChange={(event) =>
                    handleSelectChange(
                      event as unknown as ChangeEvent<HTMLSelectElement>
                    )
                  }
                >
                  {LD_NATURE.map((data) => (
                    <SelectItem key={data.item} value={data.item}>
                      {data.item}
                    </SelectItem>
                  ))}
                </Select>
                <Spacer x={4}></Spacer>
                <Select
                  id='typeOfLD'
                  name='typeOfLD'
                  isRequired
                  label='Type of L&D'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Managerial'
                  onChange={(event) =>
                    handleSelectChange(
                      event as unknown as ChangeEvent<HTMLSelectElement>
                    )
                  }
                >
                  {LD_TYPE.map((data) => (
                    <SelectItem key={data.item} value={data.item}>
                      {data.item}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <RadioGroup
                  id='sponsored'
                  name='sponsored'
                  isRequired
                  label='Is the L&D Activity sponsored by CSC/ a recognized or registered professional organization?'
                  orientation='horizontal'
                  onChange={(value) =>
                    handleRadioChange("sponsored", value.target.value)
                  }
                >
                  <Radio value='true'>Yes</Radio>
                  <Radio value='false'>No</Radio>
                </RadioGroup>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <RadioGroup
                  id='withinJobDesc'
                  name='withinJobDesc'
                  isRequired
                  label={`Is the nature of the L&D Activity within the participant's job description/office function or field of specialization?`}
                  orientation='horizontal'
                  onChange={(value) =>
                    handleRadioChange("withinJobDesc", value.target.value)
                  }
                >
                  <Radio value='true'>Yes</Radio>
                  <Radio value='false'>No</Radio>
                </RadioGroup>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <RadioGroup
                  id='recentLD'
                  name='recentLD'
                  isRequired
                  label='Has the official/employee previously attended an L&D Activity within the last three (3) months?'
                  orientation='horizontal'
                  onChange={(value) =>
                    handleRadioChange("recentLD", value.target.value)
                  }
                >
                  <Radio value='true'>Yes</Radio>
                  <Radio value='false'>No</Radio>
                </RadioGroup>
              </div>
              {inputs.recentLD ? (
                <>
                  <Divider className='mt-5'></Divider>
                  <div className='flex flex-row justify-start items-center mt-5'>
                    <Input
                      id='previousLD'
                      name='previousLD'
                      //   isRequired
                      value={inputs.previousLD || ""}
                      onChange={handleInputChange}
                      placeholder='ex. Cultural & Ethnicity 01'
                      label='Last L&D Attended'
                      size='md'
                      labelPlacement='outside'
                    ></Input>
                    <Spacer x={4}></Spacer>
                    <DatePicker
                      id='previousLDDate'
                      name='previousLDDate'
                      //   isRequired
                      label='Date'
                      labelPlacement='outside'
                      size='md'
                      className='max-w-[200px]'
                      value={previousLDDate}
                      onChange={(date) => {
                        setPreviousLDDate(date);
                        handleDateChange("previousLDDate", date);
                      }}
                    ></DatePicker>
                    <Spacer x={4}></Spacer>
                    <Input
                      id='previousLDVenue'
                      name='previousLDVenue'
                      //   isRequired
                      value={inputs.previousLDVenue || ""}
                      onChange={handleInputChange}
                      placeholder='ex. Kidapawan City'
                      label='Venue'
                      size='md'
                      labelPlacement='outside'
                    ></Input>
                  </div>
                  <div className='flex flex-row justify-start items-center mt-5'>
                    <RadioGroup
                      id='prevLDPostFormSubmitted'
                      name='prevLDPostFormSubmitted'
                      label='Post-Training Report Submitted?'
                      orientation='horizontal'
                      onChange={(value) =>
                        handleRadioChange(
                          "prevLDPostFormSubmitted",
                          value.target.value
                        )
                      }
                    >
                      <Radio value='true'>Yes</Radio>
                      <Radio value='false'>No</Radio>
                    </RadioGroup>
                  </div>
                  <Divider className='my-5'></Divider>
                </>
              ) : null}
              <div className='flex flex-row justify-start items-center mt-5'>
                <CheckboxGroup
                  label='Post Activity commitments'
                  orientation='horizontal'
                  value={[
                    inputs.postLDReEcho ? "postLDReEcho" : "",
                    inputs.postFormSubmission ? "postFormSubmission" : "",
                  ]}
                  onChange={(values) => {
                    handleCheckboxChange(
                      "postLDReEcho",
                      values.includes("postLDReEcho")
                    );
                    handleCheckboxChange(
                      "postFormSubmission",
                      values.includes("postFormSubmission")
                    );
                  }}
                >
                  <Checkbox
                    id='postLDReEcho'
                    name='postLDReEcho'
                    value='postLDReEcho'
                  >
                    Re-echo
                  </Checkbox>
                  <Checkbox
                    id='postFormSubmission'
                    name='postFormSubmission'
                    value='postFormSubmission'
                  >
                    Post-training report
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                {/* <Button color='primary' type='submit' onPress={onClose}> */}
                {/* CHAT GPT OVER HERE ONLY. HOW CAN I MAKE IT SO THAT MY FORM FOESNT CLOSE UNLESS THE FORM IS VALID? */}
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

"use client";
import { TrainingFormInput } from "@/lib/definitions";
import { newTrainingHandler } from "@/server/services/trainingFormHandler";
import {
  Button,
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
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function NewTrainingForm() {
  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<TrainingFormInput>({
    title: "",
    code: "",
    modality: "On-Site",
    instructor: "",
    maxPopulation: Number(),
    status: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: name === "maxPopulation" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;
    setInputs((values) => ({ ...values, [name]: checked }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log({ ...inputs });
    await newTrainingHandler({ ...inputs });
    router.push(pathName);
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>New Training Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-row justify-center items-center'>
                <Input
                  id='title'
                  name='title'
                  isRequired
                  value={inputs.title || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Gender Sensitivity 01'
                  label='Title'
                  size='md'
                  labelPlacement='outside'
                />
                <Spacer x={4} />
                <Input
                  id='code'
                  name='code'
                  isRequired
                  value={inputs.code || ""}
                  onChange={handleInputChange}
                  placeholder='ex. GS-01'
                  label='Code'
                  size='md'
                  labelPlacement='outside'
                />
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Input
                  id='instructor'
                  name='instructor'
                  value={inputs.instructor || ""}
                  onChange={handleInputChange}
                  placeholder='ex. Juan de la Cruz'
                  label='Instructor'
                  size='md'
                  labelPlacement='outside'
                />
                <Spacer x={4} />
                <Select
                  id='modality'
                  name='modality'
                  isRequired
                  label='Modality'
                  size='md'
                  labelPlacement='outside'
                  placeholder='ex. Online'
                  onChange={handleSelectChange}
                >
                  <SelectItem key={"On-Site"}>On-Site</SelectItem>
                  <SelectItem key={"Online"}>Online</SelectItem>
                </Select>
                <Spacer x={4} />
                <Input
                  id='maxPopulation'
                  name='maxPopulation'
                  isRequired
                  value={inputs.maxPopulation.toString() || ""}
                  onChange={handleInputChange}
                  placeholder='ex. 100'
                  label='Max Members'
                  size='md'
                  labelPlacement='outside'
                />
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <div className='w-[65px] mt-5'>
                  <p className='mr-2'>{inputs.status ? "Open" : "Closed"}</p>
                </div>
                <div className='mt-6'>
                  <Switch
                    id='status'
                    name='status'
                    size='lg'
                    checked={inputs.status}
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

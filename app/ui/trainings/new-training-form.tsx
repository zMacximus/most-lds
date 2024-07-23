"use client";
import { TrainingFormInput } from "@/lib/definitions";
import { TrainingType, updateTraining } from "@/lib/models/Training";
import {
  newTrainingHandler,
  validateFormInput,
} from "@/server/services/trainingFormHandler";
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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewTrainingForm({
  loadData,
  dataToLoad,
}: {
  loadData?: boolean;
  dataToLoad?: TrainingType;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<TrainingFormInput>({
    title: "",
    code: "",
    modality: "",
    instructor: "",
    maxPopulation: Number(),
    status: false,
    url: "",
  });

  useEffect(() => {
    if (loadData && dataToLoad) {
      setInputs({
        title: dataToLoad.title,
        code: dataToLoad.code,
        modality: dataToLoad.modality,
        instructor: dataToLoad.instructor,
        maxPopulation: dataToLoad.maxPopulation,
        status: Boolean(dataToLoad.status),
        url: dataToLoad.url,
      });
    }
  }, [loadData, dataToLoad]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: name === "maxPopulation" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (keys: Set<React.Key>) => {
    const selectedKey = keys.values().next().value as string; // Get the first selected key from the iterable
    setInputs((values) => ({ ...values, modality: selectedKey }));
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;
    setInputs((values) => ({ ...values, [name]: checked }));
  };

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();
    if (await validateFormInput({ ...inputs })) {
      if (loadData) {
        await updateTraining(dataToLoad?.id!, { ...inputs });
      } else {
        await newTrainingHandler({ ...inputs });
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
            <ModalHeader>Edit Training Form</ModalHeader>
          ) : (
            <ModalHeader>New Training Form</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className='flex flex-row justify-center items-center'>
                <Input
                  id='title'
                  name='title'
                  isRequired
                  value={inputs.title}
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
                  value={inputs.code}
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
                  value={inputs.instructor}
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
                  selectedKeys={[inputs.modality]} // Wrap the key in an array
                  // @ts-ignore
                  onSelectionChange={handleSelectChange} // Note: it's onSelectionChange, not onChange
                >
                  <SelectItem key={"On-Site"}>On-Site</SelectItem>
                  <SelectItem key={"Online"}>Online</SelectItem>
                </Select>
                <Spacer x={4} />
                <Input
                  id='maxPopulation'
                  name='maxPopulation'
                  isRequired
                  value={inputs.maxPopulation.toString()}
                  onChange={handleInputChange}
                  placeholder='ex. 100'
                  label='Max Members'
                  size='md'
                  labelPlacement='outside'
                />
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <Input
                  id='url'
                  name='url'
                  isRequired
                  value={inputs.url}
                  onChange={handleInputChange}
                  placeholder='ex. https://training.com/training1'
                  label='URL'
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
                    isSelected={inputs.status}
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

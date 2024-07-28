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

  const [imgs, setImgs] = useState<string>("");

  const [inputs, setInputs] = useState<TrainingFormInput>({
    title: "",
    code: "",
    modality: "",
    instructor: "",
    maxPopulation: 999, //maxpopulation is disabled for now in the inputs and wont be referenced anywhere else unless needed
    status: false,
    url: "",
    image: "",
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

  useEffect(() => {
    console.log(imgs);
    if (loadData && dataToLoad) {
      setInputs({
        title: dataToLoad.title,
        code: dataToLoad.code,
        modality: dataToLoad.modality,
        instructor: dataToLoad.instructor,
        maxPopulation: dataToLoad.maxPopulation,
        status: Boolean(dataToLoad.status),
        url: dataToLoad.url,
        image: dataToLoad.image,
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

    const updatedInputs = { ...inputs };
    if (imgs) {
      updatedInputs.image = imgs;
    }

    if (await validateFormInput({ ...updatedInputs })) {
      if (loadData) {
        await updateTraining(dataToLoad?.id!, { ...updatedInputs });
      } else {
        await newTrainingHandler({ ...updatedInputs });
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
                <div className='flex flex-col flex-shrink border-soli border- border-black'>
                  <label className='mb-4 text-sm'>Cover Picture</label>
                  <input
                    id='coverImage'
                    type='file'
                    name='file'
                    //@ts-ignore
                    onChange={handleProfileImageChange}
                  />
                </div>
                <Spacer x={4}></Spacer>
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
                {/* <Spacer x={4} />
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
                /> */}
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

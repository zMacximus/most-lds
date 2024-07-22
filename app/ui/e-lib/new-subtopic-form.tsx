"use client";
import { SubTopicFormInput } from "@/lib/definitions";
import { SubTopicType, updateSubtopic } from "@/lib/models/SubTopic";
import {
  newSubTopicHandler,
  validateFormInput,
} from "@/server/services/subTopicFormHandler";
import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewSubTopicForm({
  categoryName,
  mainTopicId,
  user_id,
  loadData,
  dataToLoad,
}: {
  categoryName: string;
  mainTopicId: number;
  user_id: string;
  loadData?: boolean;
  dataToLoad?: SubTopicType;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<SubTopicFormInput>({
    // id: null,
    mainTopicId: mainTopicId,
    subTopicTitle: "",
    url: "",
    typeOfContent: 0, //0 = PDF; 1 = Video; 2=PPT
    categoryName: categoryName,
    uploadedBy: user_id,
  });

  useEffect(() => {
    if (loadData && dataToLoad) {
      setInputs({
        mainTopicId: mainTopicId,
        subTopicTitle: dataToLoad.subTopicTitle,
        url: dataToLoad.url,
        typeOfContent: dataToLoad.typeOfContent,
        categoryName: categoryName,
        uploadedBy: user_id,
      });
    }
  }, [loadData, dataToLoad, categoryName, mainTopicId, user_id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((values) => ({
      ...values,
      typeOfContent:
        event.target.value === "pdf"
          ? 0
          : event.target.value === "video"
          ? 1
          : 2,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => {
    event.preventDefault();

    let newURL;
    if (inputs.typeOfContent == 0)
      newURL = inputs.url.replace("/view", "/preview");
    if (inputs.typeOfContent == 1)
      newURL = inputs.url.replace("/watch?v=", "/embed/");
    if (inputs.typeOfContent == 2)
      newURL = inputs.url.replace(
        /\/(edit|present|preview|view)\?.*$/,
        "/embed"
      );
    console.log(newURL);

    inputs.url = newURL!;

    console.log({ ...inputs });
    if (await validateFormInput({ ...inputs })) {
      if (loadData) {
        await updateSubtopic(dataToLoad?.id!, inputs);
      } else {
        await newSubTopicHandler({ ...inputs }, categoryName);
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
            <ModalHeader>Edit Subtopic Form</ModalHeader>
          ) : (
            <ModalHeader>New Subtopic Form</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className='flex flex-row justify-center items-center'>
                <Input
                  id='subTopicTitle'
                  name='subTopicTitle'
                  isRequired
                  value={inputs.subTopicTitle}
                  onChange={handleInputChange}
                  placeholder='ex. Gender Sensitivity Module'
                  label='Sub Topic Title'
                  size='md'
                  labelPlacement='outside'
                />
              </div>
              <div className='flex flex-row justify-center items-center mt-5'>
                <Input
                  id='url'
                  name='url'
                  isRequired
                  value={inputs.url}
                  onChange={handleInputChange}
                  placeholder='ex. http://example.com/module.pdf'
                  label='Content URL'
                  size='md'
                  labelPlacement='outside'
                />
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <RadioGroup
                  label='Content Type'
                  orientation='horizontal'
                  value={
                    inputs.typeOfContent === 0
                      ? "pdf"
                      : inputs.typeOfContent === 1
                      ? "video"
                      : "ppt"
                  }
                  onChange={handleRadioChange}
                >
                  <Radio value='pdf'>PDF</Radio>
                  <Radio value='video'>Video</Radio>
                  <Radio value='ppt'>PPT</Radio>
                </RadioGroup>
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

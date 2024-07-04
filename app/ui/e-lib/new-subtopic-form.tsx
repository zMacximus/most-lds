"use client";
import { SubTopicFormInput } from "@/lib/definitions";
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
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

function convertVideoURL(url: string) {
  const embedURL = new URL(url);
  embedURL.searchParams.delete("watch?v=");
  embedURL.pathname = embedURL.pathname.replace("watch", "embed");
  return embedURL.toString();
}

function convertPDFURL(url: string) {
  return url.replace("/view", "/preview");
}

export default function NewSubTopicForm({
  categoryName,
  mainTopicId,
}: {
  categoryName: string;
  mainTopicId: number;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<SubTopicFormInput>({
    // id: null,
    mainTopicId: mainTopicId,
    subTopicTitle: "",
    url: "",
    typeOfContent: 0, //0 = PDF; 1 = Video
    categoryName: categoryName,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((values) => ({
      ...values,
      typeOfContent: event.target.value === "pdf" ? 0 : 1,
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
    console.log(newURL);

    inputs.url = newURL!;

    // let embedUrl: string = "";
    // if (inputs.typeOfContent == 0) {
    //   embedUrl = convertVideoURL(inputs.url);
    // } else if (inputs.typeOfContent == 1) {
    //   embedUrl = convertPDFURL(inputs.url);
    // }
    // console.log("INITIAL URL: ", inputs.url);
    // console.log("NEW URL: ", embedUrl);

    console.log({ ...inputs });
    if (await validateFormInput({ ...inputs })) {
      await newSubTopicHandler({ ...inputs }, categoryName);
      onClose();
      router.push(pathName);
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>New Topic Form</ModalHeader>
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
                  value={inputs.typeOfContent === 0 ? "pdf" : "video"}
                  onChange={handleRadioChange}
                >
                  <Radio value='pdf'>PDF</Radio>
                  <Radio value='video'>Video</Radio>
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

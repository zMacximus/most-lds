"use client";
import { TopicFormInput } from "@/lib/definitions";
import { TopicType, updateTopic } from "@/lib/models/MainTopic";
import {
  newTopicHandler,
  validateFormInput,
} from "@/server/services/topicFormHandler";
import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function NewTopicForm({
  categoryName,
  user_id,
  loadData,
  dataToLoad,
}: {
  categoryName: string;
  user_id: string;
  loadData?: boolean;
  dataToLoad?: TopicType;
}) {
  console.log("TOPIC FORM USER: ", user_id);

  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<TopicFormInput>({
    topicTitle: "",
    categoryName: categoryName,
    createdBy: user_id,
  });

  useEffect(() => {
    if (loadData && dataToLoad) {
      setInputs({
        topicTitle: dataToLoad.topicTitle,
        categoryName: categoryName,
        createdBy: user_id,
      });
    }
  }, [loadData, dataToLoad, categoryName, user_id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();

    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      if (loadData) {
        await updateTopic(categoryName, dataToLoad?.id!, inputs);
      } else {
        await newTopicHandler({ ...inputs });
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
            <ModalHeader>Edit Topic Form</ModalHeader>
          ) : (
            <ModalHeader>New Topic Form</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className='flex flex-row justify-center items-center'>
                <Input
                  id='topicTitle'
                  name='topicTitle'
                  isRequired
                  value={inputs.topicTitle}
                  onChange={handleInputChange}
                  placeholder='ex. Gender Sensitivity Module'
                  label='Topic Title'
                  size='md'
                  labelPlacement='outside'
                ></Input>
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

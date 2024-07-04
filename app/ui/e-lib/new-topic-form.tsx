"use client";
import { TopicFormInput } from "@/lib/definitions";
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
import { ChangeEvent, FormEvent, useState } from "react";

export default function NewTopicForm({
  categoryName,
}: {
  categoryName: string;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<TopicFormInput>({
    topicTitle: "",
    categoryName: categoryName,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();

    if (await validateFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      await newTopicHandler({ ...inputs });
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
                  id='topicTitle'
                  name='topicTitle'
                  isRequired
                  //   value={inputs.topicTitle}
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

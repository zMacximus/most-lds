"use client";
import { SubTopicFormInput } from "@/lib/definitions";
import { dropTopic } from "@/lib/models/MainTopic";
import { dropSubTopic } from "@/lib/models/SubTopic";
import { dropTraining } from "@/lib/models/Training";
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
import { ChangeEvent, FormEvent, useState } from "react";

export default function DeleteContentForm({
  categoryName,
  content_id,
  user_id,
  contentType,
}: {
  categoryName?: string;
  content_id: number;
  user_id: string;
  contentType: "topic" | "subtopic" | "training"; //expand later to work with the rest of the tables that need deletion
}) {
  const router = useRouter();
  const pathName = usePathname();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => {
    event.preventDefault();

    //await DeleteContent
    if (contentType === "topic")
      await dropTopic(categoryName ? categoryName : "default", content_id);
    if (contentType === "subtopic") await dropSubTopic(content_id);
    if (contentType === "training") await dropTraining(content_id);
    onClose();
    router.push(pathName);
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Are you sure you want to delete this?</ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button color='primary' type='submit'>
                  Confirm
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

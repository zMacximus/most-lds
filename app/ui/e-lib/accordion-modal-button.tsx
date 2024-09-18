"use client";
import {
  EyeIcon,
  LockClosedIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Modal, Button, useDisclosure, button } from "@nextui-org/react";
import { ReactNode } from "react";

export default function AccordionModalFormButton({
  children,
  buttonIcon,
  buttonSize,
}: {
  children: ReactNode;
  buttonIcon: "pencil" | "eye" | "plus" | "trash" | "lock";
  buttonSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const icons = {
    pencil: PencilIcon,
    eye: EyeIcon,
    plus: PlusCircleIcon,
    trash: TrashIcon,
    lock: LockClosedIcon,
  };

  const IconButton = icons[buttonIcon];
  return (
    <>
      {buttonIcon === "trash" ? (
        <Button
          onPress={onOpen}
          size="md"
          isIconOnly
          color="danger"
          variant="light"
          //   value={data.title}
          // onPress={(e) => console.log(e.target.value)}
        >
          <div className="flex flex-row justify-center items-center max-h-[2em] max-w-[100em]">
            <IconButton width={"25px"}></IconButton>
            {/* <span className='text-nowrap text-white pr-2.5'>{buttonName}</span> */}
          </div>
        </Button>
      ) : (
        <Button
          onPress={onOpen}
          size="md"
          isIconOnly
          variant="light"
          //   value={data.title}
          // onPress={(e) => console.log(e.target.value)}
        >
          <div className="flex flex-row justify-center items-center max-h-[2em] max-w-[100em]">
            <IconButton width={"25px"}></IconButton>
            {/* <span className='text-nowrap text-white pr-2.5'>{buttonName}</span> */}
          </div>
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={buttonSize ? buttonSize : "5xl"}
        isKeyboardDismissDisabled={true}
        isDismissable={false}
        backdrop="blur"
        scrollBehavior="outside"
      >
        {children}
      </Modal>
    </>
  );
}

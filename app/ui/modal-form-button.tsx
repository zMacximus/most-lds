"use client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";

export default function ModalFormButton({
  children,
  buttonName,
}: {
  children: ReactNode;
  buttonName: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color='primary' size='md'>
        <div className='flex flex-row justify-center items-center max-h-[2em] max-w-[100em]'>
          <PlusCircleIcon
            width={"2.5em"}
            color='white'
            className='p-1.5'
          ></PlusCircleIcon>
          <span className='text-nowrap text-white pr-2.5'>{buttonName}</span>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='5xl'
        isKeyboardDismissDisabled={true}
        isDismissable={false}
        backdrop='blur'
        scrollBehavior='outside'
      >
        {children}
      </Modal>
    </>
  );
}

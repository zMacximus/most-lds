"use client";
import {
  AdminFormInput,
  UserPassword,
  UserTrainingInput,
} from "@/lib/definitions";
import { AdminFormType, updateApproval } from "@/lib/models/AdminForm";
import {
  editPasswordFormHandler,
  validatePasswordFormInput,
} from "@/lib/models/User";
import { UserTrainingType } from "@/lib/models/UserTraining";
import {
  newUserTrainingFormHandler,
  validateFormInput,
} from "@/server/services/userTrainingFormHandler";
// import {
//   newAdminFormHandler,
//   validateFormInput,
// } from "@/server/services/adminFormHandler";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  Button,
  DatePicker,
  DateValue,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function EditPassword({
  user_id,
  loadData,
  dataToLoad,
  readOnly,
  adminStatus,
  fullName,
}: {
  user_id: string;
  loadData?: boolean;
  dataToLoad?: UserPassword;
  readOnly?: boolean;
  adminStatus?: boolean;
  fullName?: string;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [inputs, setInputs] = useState<UserPassword>({
    username: user_id,
    password: "",
  });

  //   const [isFormValid, setIsFormValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value: string | number = event.target.value;

    console.log(`${name} = ${value}`);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (loadData && dataToLoad) {
      const d = dataToLoad;
      setInputs({
        username: d.username,
        password: d.password,
      });
    }
  }, [loadData, dataToLoad]);

  let statusCode: number;

  const handleSubmit = async (event: FormEvent, onClose: () => void) => {
    event.preventDefault();

    if (await validatePasswordFormInput({ ...inputs })) {
      //   setIsFormValid(true);
      //   if (loadData) {
      //     if (adminStatus) {
      //       console.log(fullName);
      //       await updateApproval(dataToLoad?.id!, fullName!, statusCode);
      //     }
      //   } else {
      await editPasswordFormHandler({ ...inputs });
      //   }
      onClose();
      router.push(pathName);
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <>
          {loadData ? (
            <ModalHeader>Edit Password</ModalHeader>
          ) : (
            <ModalHeader>New Password</ModalHeader>
          )}
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div className="flex flex-row justify-center items-center">
                <Input
                  id="password"
                  name="password"
                  isRequired
                  isReadOnly={readOnly}
                  value={inputs.password || ""}
                  onChange={handleInputChange}
                  placeholder="ex. 1234"
                  label="Password"
                  size="md"
                  labelPlacement="outside"
                ></Input>
              </div>
              <ModalFooter>
                {loadData && dataToLoad && readOnly && adminStatus ? (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      type="submit"
                      onPress={() => (statusCode = 0)}
                    >
                      Deny
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      onPress={() => (statusCode = 2)}
                    >
                      Approve
                    </Button>
                  </>
                ) : loadData && dataToLoad && readOnly && !adminStatus ? (
                  <>
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </>
                )}
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

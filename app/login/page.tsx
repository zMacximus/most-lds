"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import {
  ExclamationCircleIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import mostLogo from "../../public/logo.png";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { cookies } from "next/headers";

type LoginInput = {
  username: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};

export default function Page({ searchParams }: PageProps) {
  const [inputs, setInputs] = useState<LoginInput>({
    username: "",
    password: "",
  });
  // const {pending} = useFormStatus();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      username: inputs.username,
      password: inputs.password,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-green-600">
      <div className="flex flex-row justify-center items-center">
        {/* <GlobeAltIcon height={'10em'}
            className='text-gray-50 rotate-[15deg]'></GlobeAltIcon> */}
        <Image
          src={mostLogo.src}
          height={1600}
          width={1600}
          alt="MOST-BARMM LOGO"
          quality={100}
          className="h-[10em] w-[10em]"
        ></Image>
        <p className="text-[10em] text-gray-50 text-center">HRMIS-TMS</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center start border- border-solid border-black p-5">
          <Input
            id="username"
            name="username"
            type="text"
            // autoComplete="off"
            required
            value={inputs.username || ""}
            onChange={handleChange}
            placeholder="username"
            startContent={<UserIcon width={"2em"}></UserIcon>}
          ></Input>
          <Spacer y={2}></Spacer>
          <Input
            id="password"
            name="password"
            type="password"
            // autoComplete="off"
            required
            value={inputs.password || ""}
            onChange={handleChange}
            placeholder="password"
            startContent={<LockClosedIcon width={"2em"}></LockClosedIcon>}
          ></Input>
          <Spacer y={2}></Spacer>
          <Button type="submit">Login</Button>
          <div
            className="flex h-8 items-end space-x-1 border- border-solid border-red-600"
            aria-live="polite"
            aria-atomic="true"
          >
            {searchParams.error && (
              <p className="text-red-600 text-center capitalize">
                Login failed.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

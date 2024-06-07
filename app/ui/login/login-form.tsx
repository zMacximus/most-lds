"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import mostLogo from "../../public/logo.png";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import LogoSplash from "public/placeholder/login-splash.jpg";

type LoginInput = {
  username: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};

export default function LoginForm({ searchParams }: PageProps) {
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
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col justify-center items-center start border- border-solid border-black p-5'>
        <Input
          id='username'
          name='username'
          type='text'
          // autoComplete="off"
          color='primary'
          required
          value={inputs.username || ""}
          onChange={handleChange}
          placeholder='username'
          startContent={<UserIcon width={"2em"}></UserIcon>}
        ></Input>
        <Spacer y={2}></Spacer>
        <Input
          id='password'
          name='password'
          type='password'
          // autoComplete="off"
          color='primary'
          required
          value={inputs.password || ""}
          onChange={handleChange}
          placeholder='password'
          startContent={<LockClosedIcon width={"2em"}></LockClosedIcon>}
        ></Input>
        <Spacer y={5}></Spacer>
        <Button type='submit' color='primary'>
          Login
        </Button>
        <Spacer y={7}></Spacer>
        <div
          className='flex h-8 items-end space-x-1 border- border-solid border-red-600'
          aria-live='polite'
          aria-atomic='true'
        >
          {searchParams.error && (
            <p className='text-red-600 text-center capitalize'>Login failed.</p>
          )}
        </div>
      </div>
    </form>
  );
}

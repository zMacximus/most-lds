import { Button, Input, Spacer } from "@nextui-org/react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import mostLogo from "../../public/logo.png";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import LogoSplash from "public/placeholder/login-splash.jpg";
import LoginForm from "@/components/login/login-form";

// type LoginInput = {
//   username: string;
//   password: string;
// };

type PageProps = {
  searchParams: { error?: string };
};

export default function Page({ searchParams }: PageProps) {
  // const [inputs, setInputs] = useState<LoginInput>({
  //   username: "",
  //   password: "",
  // });
  // // const {pending} = useFormStatus();

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   await signIn("credentials", {
  //     username: inputs.username,
  //     password: inputs.password,
  //     callbackUrl: "/dashboard",
  //   });
  // };
  return (
    <div className='flex flex-row'>
      <div className='md:flex flex-1 relative hidden'>
        <Image
          src={LogoSplash.src}
          height={1000}
          width={1000}
          alt=''
          className='w-full h-full fit overflow-hidden drop-shadow-2xl'
        ></Image>
      </div>
      <div className='flex flex-col flex-1 md:flex-[0.5] h-screen justify-center items-center bg-white'>
        <div className='flex flex-col justify-center items-center mt-10 md:mt-0'>
          <Image
            src={mostLogo.src}
            height={1600}
            width={1600}
            alt='MOST-BARMM LOGO'
            quality={100}
            className='h-[10em] w-[10em]'
          ></Image>
          <div className='flex px-5'>
            <p className='text-[5em] text-primary text-center'>HRMIS-TMS</p>
          </div>
        </div>
        <LoginForm searchParams={searchParams}></LoginForm>
      </div>
    </div>
  );
}

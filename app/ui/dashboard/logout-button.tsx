"use server";
// import { authCookie } from "@/server/services/cookies"
import { signOut } from "@/server/services/userService";
// signOut
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
// import { signOut } from "next-auth/react"
// import { useRouter } from "next/navigation"

export default async function LogoutButton() {
  const handleLogout = async () => {
    "use server";
    await signOut();
  };
  return (
    <form action={handleLogout}>
      <button
        type='submit'
        className='flex h-[48px] w-full grow items-center justify-center gap-2 bg-white p-3 text-sm font-medium hover:bg-primary-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3'
      >
        <ArrowLeftStartOnRectangleIcon className='w-6' />
        <div className='hidden md:block'>Sign Out</div>
      </button>
    </form>
  );
}

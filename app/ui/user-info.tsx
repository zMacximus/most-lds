"use client";

import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: {
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  };
};

export default function UserInfo({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className='rounded-lg border shadow-lg p-10'>
      <div>Username : {user.username}</div>
      <div>firstName : {user.firstName}</div>
      <div>lastName : {user.lastName}</div>
      <button
        className='font-medium mt-2 text-blue-600 hover:underline'
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

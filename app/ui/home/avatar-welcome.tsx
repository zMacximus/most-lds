import { Avatar } from "@nextui-org/react";
import placeholderMan from "public/placeholder/Placeholder-Man.jpg";
import { getUserCookie } from "@/server/services/cookies";
import User from "@/lib/models/User";
import { Op } from "sequelize";

async function getName() {
  "use server";
  const user_firstName = await User.findOne({
    where: { username: { [Op.like]: `%${getUserCookie()}%` } },
  });
  if (!user_firstName?.getDataValue("firstName")) return null;

  return user_firstName?.getDataValue("firstName");
}

export default function WelcomeAvatar() {
  return (
    // <div className='flex-none'>
    <div className='flex flex-row justify-start items-center m-3 mr-5 border-solid border- border-black'>
      <Avatar
        src={placeholderMan.src}
        name='Henry'
        className='mr-2 drop-shadow-sm'
      />
      <p className='text-[1.5rem]'>Welcome back, {getName()}</p>
    </div>
    // </div>
  );
}

import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING(),
      primaryKey: true,
      allowNull: false,
      unique: "username",
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: "most2024",
    },
    admin: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    birthDay: {
      type: DataTypes.DATEONLY(),
      // allowNull: false,
    },
    joinDate: {
      type: DataTypes.DATEONLY(),
      // allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default User;

export type UserType = {
  username: string;
  password: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  department: string;
  title: string;
  address: string;
  religion: string;
  birthDay?: string; // Optional because it might not be present
  joinDate?: string; // Optional because it might not be present
};

export async function findUserData(username: string) {
  try {
    db;
    const user = await User.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    });

    return {
      username: user?.getDataValue("username"),
      firstName: user?.getDataValue("firstName"),
      lastName: user?.getDataValue("lastName"),
      admin: user?.getDataValue("admin"),
    };
  } catch (err) {
    console.error("INVALID CREDS", err);
    return null;
  }
}

export async function isUserAdmin(username: string) {
  const user = await findUserData(username);
  return user?.admin;
}

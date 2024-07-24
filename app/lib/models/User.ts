"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import { EmployeeFormInput } from "../definitions";

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING(),
      primaryKey: true,
      allowNull: false,
      unique: "username",
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: "email",
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
    employmentStatus: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    maritalStatus: {
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
      allowNull: false,
    },
    joinDate: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(),
    },
  },
  { freezeTableName: true }
);

User.sync();

export default User;

export type UserType = {
  username: string;
  email: string;
  password?: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  department: string;
  title: string;
  employmentStatus: string;
  phoneNumber: string;
  maritalStatus: string;
  address: string;
  religion: string;
  birthDay: string;
  joinDate: string;
  image: string;
};

export async function findUserData(username: string): Promise<UserType | null> {
  try {
    const data = await User.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    }).then((data) => {
      return {
        username: data?.getDataValue("username"),
        email: data?.getDataValue("email"),
        firstName: data?.getDataValue("firstName"),
        lastName: data?.getDataValue("lastName"),
        department: data?.getDataValue("department"),
        title: data?.getDataValue("title"),
        employmentStatus: data?.getDataValue("employmentStatus"),
        phoneNumber: data?.getDataValue("phoneNumber"),
        maritalStatus: data?.getDataValue("maritalStatus"),
        address: data?.getDataValue("address"),
        religion: data?.getDataValue("religion"),
        birthDay: data?.getDataValue("birthDay"),
        joinDate: data?.getDataValue("joinDate"),
        admin: data?.getDataValue("admin"),
        image: data?.getDataValue("image"),
      };
    });

    return data;
  } catch (err) {
    console.error("INVALID CREDS", err);
    return null;
  }
}

export async function getAllUserData(query?: string): Promise<UserType[]> {
  try {
    let whereClause = {};

    if (query) {
      whereClause = {
        where: {
          [Op.or]: [
            { username: { [Op.like]: `%${query}%` } },
            { firstName: { [Op.like]: `%${query}%` } },
            { lastName: { [Op.like]: `%${query}%` } },
            { department: { [Op.like]: `%${query}%` } },
            { title: { [Op.like]: `%${query}%` } },
          ],
        },
      };
    }
    const dataArray = await User.findAll(whereClause);

    const users: UserType[] = dataArray.map((data) => ({
      username: data.getDataValue("username"),
      email: data.getDataValue("email"),
      firstName: data.getDataValue("firstName"),
      lastName: data.getDataValue("lastName"),
      department: data.getDataValue("department"),
      title: data.getDataValue("title"),
      employmentStatus: data.getDataValue("employmentStatus"),
      phoneNumber: data.getDataValue("phoneNumber"),
      maritalStatus: data.getDataValue("maritalStatus"),
      address: data.getDataValue("address"),
      religion: data.getDataValue("religion"),
      birthDay: data.getDataValue("birthDay"),
      joinDate: data.getDataValue("joinDate"),
      admin: data.getDataValue("admin"),
      image: data.getDataValue("image"),
    }));

    return users;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    return [];
  }
}

export async function dropEmployee(username: string) {
  User.destroy({ where: { username: username } });
}

export async function updateEmployee(
  username: string,
  data: EmployeeFormInput
) {
  // Create the update object with mandatory fields
  const updateData: any = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    department: data.department,
    title: data.title,
    employmentStatus: data.employmentStatus,
    phoneNumber: data.phoneNumber,
    maritalStatus: data.maritalStatus,
    address: data.address,
    religion: data.religion,
    birthDay: data.birthDay,
    joinDate: data.joinDate,
    admin: data.admin,
  };

  // Conditionally add the image field if it's not null
  if (data.image !== null) {
    updateData.image = data.image;
  }

  // Perform the update
  await User.update(updateData, { where: { username: username } });
}

export async function getUserImage(username: string): Promise<string | null> {
  try {
    const user = await User.findOne({
      attributes: ["image"],
      where: { username: { [Op.like]: `%${username}%` } },
    });

    return user ? user.getDataValue("image") : null;
  } catch (err) {
    console.error("Error fetching user image", err);
    return null;
  }
}

export async function isUserAdmin(username: string): Promise<boolean | null> {
  const user = await findUserData(username);
  return user?.admin ?? null;
}

export async function getUserFullName(
  username: string
): Promise<string | null> {
  try {
    const user = await findUserData(username);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching user full name", err);
    return null;
  }
}

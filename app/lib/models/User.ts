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

export async function getAllUserData(query?: string) {
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
    const users = await User.findAll(whereClause)
      .then((dataArray) => {
        return dataArray.map((data) => ({
          username: data.getDataValue("username"),
          firstName: data.getDataValue("firstName"),
          lastName: data.getDataValue("lastName"),
          department: data.getDataValue("department"),
          title: data.getDataValue("title"),
        }));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        return [];
      });

    return users;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    return [];
  }
}

export async function isUserAdmin(username: string) {
  const user = await findUserData(username);
  return user?.admin;
}

export async function getUserFullName(username: string) {
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

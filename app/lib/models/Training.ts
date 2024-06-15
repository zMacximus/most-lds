import { DataTypes } from "sequelize";
import db from "@/lib/sequelize";

const Training = db.define(
  "Training",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      unique: "id",
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: "code",
      defaultValue: "TRN-001",
    },
    title: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: "Training",
    },
    modality: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: "On-Site",
    },
    currentPopulation: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0,
    },
    maxPopulation: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 100,
    },
    instructor: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: "INSERT INSTRUCTOR HERE",
    },
    status: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
);

// db.sync({ alter: true, force: true });

export default Training;

export type TrainingType = {
  id: number;
  code: string;
  title: string;
  modality: string;
  currentPopulation: number;
  maxPopulation: number;
  instructor: string;
  status: string;
};

export async function getAllTrainings() {
  try {
    const trainings: TrainingType[] = await Training.findAll()
      .then((dataArray) => {
        return dataArray.map((data) => ({
          id: data.getDataValue("id"),
          code: data.getDataValue("code"),
          title: data.getDataValue("title"),
          modality: data.getDataValue("modality"),
          currentPopulation: data.getDataValue("currentPopulation"),
          maxPopulation: data.getDataValue("maxPopulation"),
          instructor: data.getDataValue("instructor"),
          status: data.getDataValue("status"),
        }));
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        return [];
      });

    return trainings;
  } catch (error) {
    console.log("Something went wrong trying to access database: ", error);
  }
}

// export async function findUserData(username: string) {
//   try {
//     db;
//     const user = await User.findOne({
//       where: {
//         username: {
//           [Op.like]: `%${username}%`,
//         },
//       },
//     });

//     return {
//       username: user?.getDataValue("username"),
//       firstName: user?.getDataValue("firstName"),
//       lastName: user?.getDataValue("lastName"),
//       admin: user?.getDataValue("admin"),
//     };
//   } catch (err) {
//     console.error("INVALID CREDS", err);
//     return null;
//   }
// }

// export async function isUserAdmin(username: string) {
//   const user = await findUserData(username);
//   return user?.admin;
// }

//@ts-nocheck
"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import User from "./User";
import { string } from "zod";

const UserTrainings = db.define(
  "User_Trainings",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      unique: "id",
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    dateOfTraining: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
    },
    employee: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

UserTrainings.sync();

export default UserTrainings;

export type UserTrainingType = {
  //PLEASE UPDATE THIS TO MATCH THE MODEL ABOVE. ONLY DO THIS
  id: number;
  name: string;
  dateOfTraining: Date;
  employee: string;
};

export async function getAllUserTrainings(
  user_id: string,
  query?: string
): Promise<UserTrainingType[]> {
  try {
    // Define the base condition for filtering by user_id
    const whereCondition: any = {
      employee: user_id,
    };

    // If a query is provided, add a condition to search by training name
    if (query) {
      whereCondition.name = {
        [Op.like]: `%${query}%`, // Case-insensitive partial match for the name
      };
    }

    // Find all trainings that match the user_id and (optionally) the name query
    const trainings = await UserTrainings.findAll({
      where: whereCondition,
      order: [["dateOfTraining", "DESC"]], // Sort by dateOfTraining, descending
    });

    // Map the results to a format that matches UserTrainingType
    const userTrainings = trainings.map((training) => ({
      id: training.id,
      name: training.name,
      dateOfTraining: training.dateOfTraining,
      employee: training.employee,
    }));

    return userTrainings;
  } catch (error) {
    console.error("Error fetching user trainings:", error);
    return [];
  }
}

export async function dropUserTraining(content_id: number) {
  UserTrainings.destroy({ where: { id: content_id } });
}

// export async function getAllAdminForms(query?: any, signName?: string) {
//   try {
//     let whereClause = {};

//     if (query) {
//       whereClause = {
//         [Op.or]: [
//           { employeeName: { [Op.like]: `%${query}%` } },
//           { division: { [Op.like]: `%${query}%` } },
//           { position: { [Op.like]: `%${query}%` } },
//           { employmentStatus: { [Op.like]: `%${query}%` } },
//           { officerInCharge: { [Op.like]: `%${query}%` } },
//           { titleOfLD: { [Op.like]: `%${query}%` } },
//           { venue: { [Op.like]: `%${query}%` } },
//           { serviceProvider: { [Op.like]: `%${query}%` } },
//           { modeOfLD: { [Op.like]: `%${query}%` } },
//           { level: { [Op.like]: `%${query}%` } },
//           { natureOfParticipation: { [Op.like]: `%${query}%` } },
//           { typeOfLD: { [Op.like]: `%${query}%` } },
//           { submittedBy: { [Op.like]: `%${query}%` } },
//         ],
//       };
//     }

//     const adminForms: AdminFormType[] = await AdminForm.findAll({
//       where: whereClause,
//     })
//       .then((dataArray) => {
//         return dataArray.map((data) => ({
//           id: data.getDataValue("id"),
//           employee: data.getDataValue("employeeName"),
//           division: data.getDataValue("division"),
//           dateOfLD: data.getDataValue("dateOfLD"),
//         }));
//       })
//       .catch((error) => {
//         console.log("Error fetching data: ", error);
//         return [];
//       });

//     return adminForms;
//   } catch (error) {
//     console.log("Something went wrong trying to access the database: ", error);
//     return [];
//   }
// }

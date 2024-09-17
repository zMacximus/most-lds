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

// AdminForm.hasOne(User, {
//   foreignKey: {
//     name: "submittedBy",
//     allowNull: false,
//   },
// });
// User.hasOne(AdminForm);

// AdminForm.sync();
// db.sync({ alter: true, force: true });
// db.sync();

export default UserTrainings;

export type UserTrainingType = {
  //PLEASE UPDATE THIS TO MATCH THE MODEL ABOVE. ONLY DO THIS
  id: number;
  name: string;
  dateOfTraining: Date;
  employee: string;
};

export async function getAllUserTrainings(
  user_id: string
): Promise<UserTrainingType[]> {
  try {
    // Find all forms submitted by the given user_id
    const trainings = await UserTrainings.findAll({
      where: {
        employee: user_id,
      },
      // order: [["submissionDate", "DESC"]],
    });

    // Map the results to a format that matches AdminFormType
    const userTrainings = trainings.map((training) => ({
      id: training.id,
      name: training.name,
      dateOfTraining: training.dateOfTraining,
      employee: training.employee,
    }));

    return userTrainings;
  } catch (error) {
    console.error("Error fetching user Trainings:", error);
    return [];
  }
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

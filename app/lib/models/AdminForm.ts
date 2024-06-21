import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import User from "./User";
import { string } from "zod";

const AdminForm = db.define(
  "LNDPR_Form",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      unique: "id",
      autoIncrement: true,
    },
    employeeName: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    employmentStatus: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    officerInCharge: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    titleOfLD: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    dateOfLD: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    numberOfHours: {
      type: DataTypes.FLOAT(),
      allowNull: false,
    },
    serviceProvider: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    modeOfLD: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    natureOfParticipation: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    typeOfLD: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    sponsored: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    withinJobDesc: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    recentLD: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    previousLD: {
      type: DataTypes.STRING(),
      //   allowNull: false,
    },
    previousLDDate: {
      type: DataTypes.DATEONLY(),
      //   allowNull: false,
    },
    previousLDVenue: {
      type: DataTypes.STRING(),
      //   allowNull: false,
    },
    prevLDPostFormSubmitted: {
      type: DataTypes.BOOLEAN(),
      //   allowNull: false,
      defaultValue: false,
    },
    postLDReEcho: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    postFormSubmission: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    formStatus: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: false,
    },
    submittedBy: {
      type: DataTypes.STRING(),
      allowNull: false,
      references: {
        model: "user",
        key: "username",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  { freezeTableName: true }
);

// AdminForm.hasOne(User, {
//   foreignKey: {
//     name: "submittedBy",
//     allowNull: false,
//   },
// });
// User.hasOne(AdminForm);

AdminForm.sync();
// db.sync({ alter: true, force: true });
// db.sync();

export default AdminForm;

export type AdminFormType = {
  //PLEASE UPDATE THIS TO MATCH THE MODEL ABOVE. ONLY DO THIS
  id: number;
  employeeName: string;
  division: string;
  position: string;
  employmentStatus: string;
  officerInCharge: string;
  titleOfLD: string;
  dateOfLD: Date;
  venue: string;
  numberOfHours: number;
  serviceProvider: string;
  modeOfLD: string;
  level: string;
  natureOfParticipation: string;
  typeOfLD: string;
  sponsored: boolean;
  withinJobDesc: boolean;
  recentLD: boolean;
  previousLD: string | null;
  previousLDDate: Date | null;
  previousLDVenue: string | null;
  prevLDPostFormSubmitted: boolean | null;
  postLDReEcho: boolean;
  postFormSubmission: boolean;
  formStatus: number;
  submittedBy: string;
  submissionDate: Date;
};

// export async function getAllAdminForms() {
//   try {
//     const adminForms: AdminFormType[] = await AdminForm.findAll()
//       .then((dataArray) => {
//         return dataArray.map((data) => ({
//           id: data.getDataValue("id"),
//           employeeName: data.getDataValue("employeeName"),
//           division: data.getDataValue("division"),
//           position: data.getDataValue("position"),
//           employmentStatus: data.getDataValue("employmentStatus"),
//           officerInCharge: data.getDataValue("officerInCharge"),
//           titleOfLD: data.getDataValue("titleOfLD"),
//           dateOfLD: data.getDataValue("dateOfLD"),
//           venue: data.getDataValue("venue"),
//           numberOfHours: data.getDataValue("numberOfHours"),
//           serviceProvider: data.getDataValue("serviceProvider"),
//           modeOfLD: data.getDataValue("modeOfLD"),
//           level: data.getDataValue("level"),
//           natureOfParticipation: data.getDataValue("natureOfParticipation"),
//           typeOfLD: data.getDataValue("typeOfLD"),
//           sponsored: data.getDataValue("sponsored"),
//           withinJobDesc: data.getDataValue("withinJobDesc"),
//           recentLD: data.getDataValue("recentLD"),
//           previousLD: data.getDataValue("previousLD"),
//           previousLDDate: data.getDataValue("previousLDDate"),
//           previousLDVenue: data.getDataValue("previousLDVenue"),
//           prevLDPostFormSubmitted: data.getDataValue("prevLDPostFormSubmitted"),
//           postLDReEcho: data.getDataValue("postLDReEcho"),
//           postFormSubmission: data.getDataValue("postFormSubmission"),
//           formStatus: data.getDataValue("formStatus"),
//           submittedBy: data.getDataValue("submittedBy"),
//           submissionDate: data.getDataValue("createdAt"),
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

export async function getAllAdminForms(query?: any) {
  try {
    let whereClause = {};

    if (query) {
      whereClause = {
        where: {
          [Op.or]: {
            employeeName: { [Op.like]: `%${query}%` },
            division: { [Op.like]: `%${query}%` },
            position: { [Op.like]: `%${query}%` },
            employmentStatus: { [Op.like]: `%${query}%` },
            officerInCharge: { [Op.like]: `%${query}%` },
            titleOfLD: { [Op.like]: `%${query}%` },
            venue: { [Op.like]: `%${query}%` },
            serviceProvider: { [Op.like]: `%${query}%` },
            modeOfLD: { [Op.like]: `%${query}%` },
            level: { [Op.like]: `%${query}%` },
            natureOfParticipation: { [Op.like]: `%${query}%` },
            typeOfLD: { [Op.like]: `%${query}%` },
            submittedBy: { [Op.like]: `%${query}%` },
          },
        },
      };
    }

    const adminForms: AdminFormType[] = await AdminForm.findAll(whereClause)
      .then((dataArray) => {
        return dataArray.map((data) => ({
          id: data.getDataValue("id"),
          employeeName: data.getDataValue("employeeName"),
          division: data.getDataValue("division"),
          position: data.getDataValue("position"),
          employmentStatus: data.getDataValue("employmentStatus"),
          officerInCharge: data.getDataValue("officerInCharge"),
          titleOfLD: data.getDataValue("titleOfLD"),
          dateOfLD: data.getDataValue("dateOfLD"),
          venue: data.getDataValue("venue"),
          numberOfHours: data.getDataValue("numberOfHours"),
          serviceProvider: data.getDataValue("serviceProvider"),
          modeOfLD: data.getDataValue("modeOfLD"),
          level: data.getDataValue("level"),
          natureOfParticipation: data.getDataValue("natureOfParticipation"),
          typeOfLD: data.getDataValue("typeOfLD"),
          sponsored: data.getDataValue("sponsored"),
          withinJobDesc: data.getDataValue("withinJobDesc"),
          recentLD: data.getDataValue("recentLD"),
          previousLD: data.getDataValue("previousLD"),
          previousLDDate: data.getDataValue("previousLDDate"),
          previousLDVenue: data.getDataValue("previousLDVenue"),
          prevLDPostFormSubmitted: data.getDataValue("prevLDPostFormSubmitted"),
          postLDReEcho: data.getDataValue("postLDReEcho"),
          postFormSubmission: data.getDataValue("postFormSubmission"),
          formStatus: data.getDataValue("formStatus"),
          submittedBy: data.getDataValue("submittedBy"),
          submissionDate: data.getDataValue("createdAt"),
        }));
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        return [];
      });

    return adminForms;
  } catch (error) {
    console.log("Something went wrong trying to access the database: ", error);
    return [];
  }
}

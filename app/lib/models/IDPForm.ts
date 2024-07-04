import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";

const IDPForm = db.define(
  "IDP_Form",
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
    position: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    yearsInThePosition: {
      type: DataTypes.FLOAT(),
      allowNull: false,
      defaultValue: 0,
    },
    division: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    objectives: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    areasOfStreangth: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    areasOfDevelopment: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    targetCompetencyTraining: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    targetScheduleOfCompletion: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    formStatus: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: false,
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

IDPForm.sync();
// db.sync({ alter: true, force: true });
// db.sync();

export default IDPForm;

export type IDPFormType = {
  id: number;
  name: string;
  submittedBy: string;
  position: string;
  yearsInThePosition: number;
  division: string;
  objectives: string | null;
  areasOfStrength: string | null;
  areasOfDevelopment: string | null;
  targetCompetencyTraining: string | null;
  targetScheduleOfCompletion: Date;
  formStatus: number;
  submissionDate: Date;
  updatedAt: Date;
}; // Adjust the import according to your project structure

export async function getUserIDPForms(
  user: string,
  query?: string
): Promise<IDPFormType[]> {
  try {
    // Initialize the where clause
    const whereClause: any = {
      submittedBy: { [Op.like]: `%${user}%` },
    };

    // If query is provided, add date filters
    if (query) {
      const queryDate = new Date(query);
      whereClause[Op.or] = [
        {
          submissionDate: {
            [Op.like]: `%${queryDate.toISOString().slice(0, 10)}%`,
          },
        },
        {
          targetScheduleOfCompletion: {
            [Op.like]: `%${queryDate.toISOString().slice(0, 10)}%`,
          },
        },
      ];
    }

    const idpForms: IDPFormType[] = await IDPForm.findAll({
      where: whereClause,
    })
      .then((dataArray) => {
        return dataArray.map((data) => ({
          id: data.getDataValue("id"),
          name: data.getDataValue("name"),
          submittedBy: data.getDataValue("submittedBy"),
          position: data.getDataValue("position"),
          yearsInThePosition: data.getDataValue("yearsInThePosition"),
          division: data.getDataValue("division"),
          objectives: data.getDataValue("objectives"),
          areasOfStrength: data.getDataValue("areasOfStrength"),
          areasOfDevelopment: data.getDataValue("areasOfDevelopment"),
          targetCompetencyTraining: data.getDataValue(
            "targetCompetencyTraining"
          ),
          targetScheduleOfCompletion: data.getDataValue(
            "targetScheduleOfCompletion"
          ),
          formStatus: data.getDataValue("formStatus"),
          submissionDate: data.getDataValue("createdAt"),
          updatedAt: data.getDataValue("updatedAt"),
        }));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        return [];
      });

    return idpForms;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    return [];
  }
}

//ALSO UPDATE THIS CHAT
export async function getAllIDPForms(query?: any): Promise<IDPFormType[]> {
  try {
    let whereClause = {};

    if (query) {
      whereClause = {
        where: {
          [Op.or]: {
            submittedBy: { [Op.like]: `%${query}%` },
            submissionDate: { [Op.like]: `%${query}%` },
            targetScheduleOfCompletion: { [Op.like]: `%${query}%` },
          },
        },
      };
    }

    const idpForms: IDPFormType[] = await IDPForm.findAll(whereClause)
      .then((dataArray) => {
        return dataArray.map((data) => ({
          id: data.getDataValue("id"),
          name: data.getDataValue("name"),
          submittedBy: data.getDataValue("submittedBy"),
          position: data.getDataValue("position"),
          yearsInThePosition: data.getDataValue("yearsInThePosition"),
          division: data.getDataValue("division"),
          objectives: data.getDataValue("objectives"),
          areasOfStrength: data.getDataValue("areasOfStrength"),
          areasOfDevelopment: data.getDataValue("areasOfDevelopment"),
          targetCompetencyTraining: data.getDataValue(
            "targetCompetencyTraining"
          ),
          targetScheduleOfCompletion: data.getDataValue(
            "targetScheduleOfCompletion"
          ),
          formStatus: data.getDataValue("formStatus"),
          submissionDate: data.getDataValue("createdAt"),
          updatedAt: data.getDataValue("updatedAt"),
        }));
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        return [];
      });

    return idpForms;
  } catch (error) {
    console.log("Something went wrong trying to access the database: ", error);
    return [];
  }
}
"use server";
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
      // references: {
      //   model: "user",
      //   key: "username",
      // },
      // onDelete: "CASCADE",
      // onUpdate: "CASCADE",
    },
    sign1: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    sign1Status: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    sign2: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    sign2Status: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    sign3: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    sign3Status: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

AdminForm.sync();

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
  sign1: string;
  sign1Status: number;
  sign2: string;
  sign2Status: number;
  sign3: string;
  sign3Status: number;
};

export async function updateApproval(
  id: number,
  userName: string,
  approval: number
) {
  try {
    // Find the form by id
    const form = await AdminForm.findByPk(id);
    if (!form) {
      throw new Error(`Form with id ${id} not found`);
    }

    // Check which sign column contains the user's name and update the appropriate status
    if (form.sign1 === userName) {
      form.sign1Status = approval;
    }

    if (form.sign2 === userName) {
      form.sign2Status = approval;
    }

    if (form.sign3 === userName) {
      form.sign3Status = approval;
    }
    // else {
    //   throw new Error(`User name ${userName} not found in any sign column`);
    // }

    // Check all sign statuses to determine form status
    const allSignStatuses = [
      form.sign1Status,
      form.sign2Status,
      form.sign3Status,
    ];

    if (allSignStatuses.includes(0)) {
      form.formStatus = 0; // Set formStatus to Denied if any signStatus is Denied
    } else if (allSignStatuses.every((status) => status === 2)) {
      form.formStatus = 2; // Set formStatus to Approved if all signStatuses are Approved
    } else {
      form.formStatus = 1; // Optionally set to Pending if not all are Approved or Denied
    }

    // Save the changes
    await form.save();

    return { success: true, message: "Approval status updated successfully" };
  } catch (error) {
    console.error("Error updating approval status:", error);
    return {
      success: false,
      message: "Error updating approval status",
      error: error.message,
    };
  }
}

export async function getAllUserLDForms(
  user_id: string
): Promise<AdminFormType[]> {
  try {
    // Find all forms submitted by the given user_id
    const forms = await AdminForm.findAll({
      where: {
        submittedBy: user_id,
      },
      // order: [["submissionDate", "DESC"]],
    });

    // Map the results to a format that matches AdminFormType
    const userForms = forms.map((form) => ({
      id: form.id,
      employeeName: form.employeeName,
      division: form.division,
      position: form.position,
      employmentStatus: form.employmentStatus,
      officerInCharge: form.officerInCharge,
      titleOfLD: form.titleOfLD,
      dateOfLD: form.dateOfLD,
      venue: form.venue,
      numberOfHours: form.numberOfHours,
      serviceProvider: form.serviceProvider,
      modeOfLD: form.modeOfLD,
      level: form.level,
      natureOfParticipation: form.natureOfParticipation,
      typeOfLD: form.typeOfLD,
      sponsored: form.sponsored,
      withinJobDesc: form.withinJobDesc,
      recentLD: form.recentLD,
      previousLD: form.previousLD,
      previousLDDate: form.previousLDDate,
      previousLDVenue: form.previousLDVenue,
      prevLDPostFormSubmitted: form.prevLDPostFormSubmitted,
      postLDReEcho: form.postLDReEcho,
      postFormSubmission: form.postFormSubmission,
      formStatus: form.formStatus,
      submittedBy: form.submittedBy,
      submissionDate: form.createdAt,
      sign1: form.sign1,
      sign1Status: form.sign1Status,
      sign2: form.sign2,
      sign2Status: form.sign2Status,
      sign3: form.sign3,
      sign3Status: form.sign3Status,
    }));

    return userForms;
  } catch (error) {
    console.error("Error fetching user LD forms:", error);
    return [];
  }
}

export async function signColumnChecker(name: string, id: number) {
  try {
    // Find the specific form by id
    const form = await AdminForm.findByPk(id);

    if (!form) {
      throw new Error(`Form with id ${id} not found`);
    }

    // Initialize variables to store the status and the columns the name appears in
    const signColumns: string[] = [];
    let signStatus: number | null = null;

    // Check which sign column contains the user's name and update the appropriate status

    if (form.sign1 === name) {
      signColumns.push("sign1");
      if (signStatus === null) {
        signStatus = form.sign1Status;
      } else if (signStatus !== form.sign1Status) {
        throw new Error(`Sign status mismatch for ${name} in sign1`);
      }
    }
    if (form.sign2 === name) {
      signColumns.push("sign2");
      if (signStatus === null) {
        signStatus = form.sign2Status;
      } else if (signStatus !== form.sign2Status) {
        throw new Error(`Sign status mismatch for ${name} in sign2`);
      }
    }
    if (form.sign3 === name) {
      signColumns.push("sign3");
      if (signStatus === null) {
        signStatus = form.sign3Status;
      } else if (signStatus !== form.sign3Status) {
        throw new Error(`Sign status mismatch for ${name} in sign3`);
      }
    }

    return {
      signColumns,
      signStatus,
    };
  } catch (error) {
    console.error("Error checking sign columns:", error);
    return { error: error.message };
  }
}

export async function getAllAdminForms(query?: any, signName?: string) {
  try {
    let whereClause = {};

    if (query) {
      whereClause = {
        [Op.or]: [
          { employeeName: { [Op.like]: `%${query}%` } },
          { division: { [Op.like]: `%${query}%` } },
          { position: { [Op.like]: `%${query}%` } },
          { employmentStatus: { [Op.like]: `%${query}%` } },
          { officerInCharge: { [Op.like]: `%${query}%` } },
          { titleOfLD: { [Op.like]: `%${query}%` } },
          { venue: { [Op.like]: `%${query}%` } },
          { serviceProvider: { [Op.like]: `%${query}%` } },
          { modeOfLD: { [Op.like]: `%${query}%` } },
          { level: { [Op.like]: `%${query}%` } },
          { natureOfParticipation: { [Op.like]: `%${query}%` } },
          { typeOfLD: { [Op.like]: `%${query}%` } },
          { submittedBy: { [Op.like]: `%${query}%` } },
        ],
      };
    }

    if (signName) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { sign1: { [Op.like]: `%${signName}%` } },
          { sign2: { [Op.like]: `%${signName}%` } },
          { sign3: { [Op.like]: `%${signName}%` } },
        ],
      };
    }

    const adminForms: AdminFormType[] = await AdminForm.findAll({
      where: whereClause,
    })
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
          sign1: data.getDataValue("sign1"),
          sign1Status: data.getDataValue("sign1Status"),
          sign2: data.getDataValue("sign2"),
          sign2Status: data.getDataValue("sign2Status"),
          sign3: data.getDataValue("sign3"),
          sign3Status: data.getDataValue("sign3Status"),
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

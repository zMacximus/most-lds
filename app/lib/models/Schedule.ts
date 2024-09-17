"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import { ScheduleFormInput } from "../definitions";
import { icons } from "../nav-links";
import { SchedulerData } from "@bitnoi.se/react-scheduler";
import { EnrolledTrainings, EnrollmentType } from "./EnrolledTrainings";
import Training, { TrainingType } from "./Training";

// Define the Schedule model
export const Schedule = db.define(
  `Schedule`,
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    // icon: {
    //   type: DataTypes.STRING(),
    //   allowNull: true,
    // },
    title: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    startDate: { type: DataTypes.DATEONLY(), allowNull: false },
    endDate: { type: DataTypes.DATEONLY(), allowNull: false },
    description: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    training_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    scheduledBy: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    // status: { type: DataTypes.INTEGER(), allowNull: false },
  },
  { freezeTableName: true }
);

Schedule.sync();

// Define the ScheduleType TypeScript type
export type ScheduleType = {
  id: number;
  //   icon: string;
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date;
  description: string;
  training_id: number;
  scheduledBy: string;
  //   status: number;
};

// Function to update a schedule
export async function updateSchedule(id: number, data: ScheduleFormInput) {
  try {
    await Schedule.update(
      {
        // icon: data.icon,
        title: data.title,
        subtitle: data.subtitle,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        // status: data.status,
      },
      { where: { id: id } }
    );
  } catch (error) {
    console.error("Error updating schedule:", error);
  }
}

// Function to delete a schedule
export async function dropSchedule(id: number) {
  try {
    await Schedule.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
  }
}

// Function to get all schedules by category and topic ID
export async function getAllSchedule(): Promise<ScheduleType[]> {
  try {
    const schedules: ScheduleType[] = await Schedule.findAll().then(
      (dataArray) => {
        return dataArray.map((data) => ({
          id: data.getDataValue("id"),
          title: data.getDataValue("title"),
          // icon: data.getDataValue('icon'),
          subtitle: data.getDataValue("subtitle"),
          startDate: data.getDataValue("startDate"),
          endDate: data.getDataValue("endDate"),
          description: data.getDataValue("description"),
          training_id: data.getDataValue("training_id"),
          scheduledBy: data.getDataValue("scheduledBy"),
          // status: data.getDataValue('status'),
        }));
      }
    );

    return schedules;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    throw error; // Rethrow the error to propagate it upwards
  }
}

export async function getAllUserSchedule(
  user_id: string
): Promise<ScheduleType[]> {
  try {
    const schedules: ScheduleType[] = await Schedule.findAll({
      where: { scheduledBy: user_id },
    }).then((dataArray) => {
      return dataArray.map((data) => ({
        id: data.getDataValue("id"),
        title: data.getDataValue("title"),
        // icon: data.getDataValue('icon'),
        subtitle: data.getDataValue("subtitle"),
        startDate: data.getDataValue("startDate"),
        endDate: data.getDataValue("endDate"),
        description: data.getDataValue("description"),
        training_id: data.getDataValue("training_id"),
        scheduledBy: data.getDataValue("scheduledBy"),
        // status: data.getDataValue('status'),
      }));
    });

    return schedules;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    throw error; // Rethrow the error to propagate it upwards
  }
}

function getBackgroundColor(startDate: Date, endDate: Date): string {
  const now = new Date();
  if (endDate < now) {
    return "red"; // Past
  } else if (startDate <= now && endDate >= now) {
    return "rgb(255, 182, 0)"; // Ongoing
  } else {
    return "green"; // Oncoming
  }
}

// Function to format schedule data
export async function formatScheduleData(user_id: string) {
  try {
    const schedules = await getAllUserSchedule(user_id).then((data) => {
      return data.map((d) => {
        return {
          id: d.id.toString(),
          label: {
            icon: "",
            title: d.title,
            subtitle: d.subtitle,
          },
          data: [
            {
              id: `${d.title}_${d.id}`,
              startDate: new Date(d.startDate),
              endDate: new Date(d.endDate),
              occupancy:
                (new Date(d.endDate).getTime() -
                  new Date(d.startDate).getTime()) /
                1000,
              title: d.title,
              subtitle: d.subtitle,
              description: d.description,
              bgColor: getBackgroundColor(
                new Date(d.startDate),
                new Date(d.endDate)
              ),
            },
          ],
        };
      });
    }); // Fetch all schedules
    // console.log(schedules);
    return schedules;
  } catch (error) {
    console.error("Error formatting schedule data:", error);
    throw error; // Rethrow the error to propagate it upwards
  }
}

export async function getUserTrainingsForScheduler(user_id: string) {
  try {
    // Fetch all enrollments for the user
    const enrollments: EnrollmentType[] = await EnrolledTrainings.findAll({
      where: { user_id },
    }).then((data) => {
      return data.map((d) => {
        return {
          id: d.getDataValue("id"),
          user_id: d.getDataValue("user_id"),
          training_id: d.getDataValue("training_id"),
        };
      });
    });

    // Extract training_ids from enrollments
    const trainingIds = enrollments.map((enrollment) => enrollment.training_id);

    // Fetch trainings based on the extracted IDs
    const trainings: TrainingType[] = await Training.findAll({
      where: {
        id: {
          [Op.in]: trainingIds,
        },
      },
    }).then((data) => {
      return data.map((d) => {
        return {
          id: d.getDataValue("id"),
          code: d.getDataValue("code"),
          title: d.getDataValue("title"),
          modality: d.getDataValue("modality"),
          currentPopulation: d.getDataValue("currentPopulation"),
          maxPopulation: d.getDataValue("maxPopulation"),
          instructor: d.getDataValue("instructor"),
          status: d.getDataValue("status"),
          url: d.getDataValue("url"),
          image: d.getDataValue("image"),
        };
      });
    });

    // Fetch schedules for the trainings
    const schedules: ScheduleType[] = await Schedule.findAll({
      where: {
        training_id: {
          [Op.in]: trainingIds,
        },
      },
    }).then((data) => {
      return data.map((d) => {
        return {
          id: d.getDataValue("id"),
          title: d.getDataValue("title"),
          subtitle: d.getDataValue("subtitle"),
          startDate: d.getDataValue("startDate"),
          endDate: d.getDataValue("endDate"),
          description: d.getDataValue("description"),
          training_id: d.getDataValue("training_id"),
          scheduledBy: d.getDataValue("scheduledBy"),
        };
      });
    });

    // Format the data for the scheduler component
    const formattedData = trainings.map((training) => {
      const trainingSchedules = schedules
        .filter((schedule) => schedule.training_id === training.id)
        .map((schedule) => {
          return {
            id: `${schedule.title}_${schedule.id}`,
            startDate: new Date(schedule.startDate),
            endDate: new Date(schedule.endDate),
            occupancy:
              (new Date(schedule.endDate).getTime() -
                new Date(schedule.startDate).getTime()) /
              1000,
            title: schedule.title,
            subtitle: training.code || "",
            description: schedule.description,
            bgColor: getBackgroundColor(
              new Date(schedule.startDate),
              new Date(schedule.endDate)
            ),
          };
        });

      return {
        id: training.id.toString(),
        label: {
          icon: "",
          title: training.title,
          subtitle: training.code,
        },
        data: trainingSchedules,
      };
    });
    // console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error("Error fetching and formatting user trainings:", error);
    throw error;
  }
}

"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import { ScheduleFormInput } from "../definitions";
import { icons } from "../nav-links";
import { SchedulerData } from "@bitnoi.se/react-scheduler";

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
export async function formatScheduleData() {
  try {
    const schedules = await getAllSchedule().then((data) => {
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

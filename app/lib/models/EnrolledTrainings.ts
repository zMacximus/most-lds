"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import { Schedule } from "./Schedule";
import Training from "./Training";

export const EnrolledTrainings = db.define(
  "EnrolledTrainings",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      unique: "id",
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    training_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

EnrolledTrainings.sync();

export type EnrollmentType = {
  id: number;
  user_id: string;
  training_id: number;
};

export async function joinTraining(user_id: string, training_id: number) {
  await EnrolledTrainings.create({
    user_id: user_id,
    training_id: training_id,
  });
}

export async function leaveTraining(user_id: string, training_id: number) {
  await EnrolledTrainings.destroy({
    where: {
      user_id: user_id,
      training_id: training_id,
    },
  });
}

export async function hasJoined(user_id: string, training_id: number) {
  const hasJoined = await EnrolledTrainings.findOne({
    where: {
      user_id: user_id,
      training_id: training_id,
    },
  });

  return hasJoined ? true : false;
}

export async function getCompletedTrainings(user_id: string) {
  try {
    // Fetch all enrollments for the user
    const enrollments = await EnrolledTrainings.findAll({
      where: { user_id },
    });

    // Fetch all schedules with an end date in the past
    const pastSchedules = await Schedule.findAll({
      where: {
        endDate: {
          [Op.lt]: new Date(),
        },
      },
    });

    // Extract training_ids from past schedules
    const pastTrainingIds = pastSchedules.map(
      //@ts-ignore
      (schedule) => schedule.training_id
    );

    // Find the trainings the user was enrolled in and that have completed
    const completedTrainingIds = enrollments
      //@ts-ignore
      .filter((enrollment) => pastTrainingIds.includes(enrollment.training_id))
      //@ts-ignore
      .map((enrollment) => enrollment.training_id);

    // Fetch the training details for completed trainings
    const completedTrainings = await Training.findAll({
      where: {
        id: {
          [Op.in]: completedTrainingIds,
        },
      },
    });

    return completedTrainings;
  } catch (error) {
    console.error("Error fetching completed trainings:", error);
    throw error;
  }
}

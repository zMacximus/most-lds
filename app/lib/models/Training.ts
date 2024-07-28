"use server";
import { DataTypes } from "sequelize";
import db from "@/lib/sequelize";
import { TrainingFormInput } from "../definitions";

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
    url: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(),
    },
  },
  { freezeTableName: true }
);

Training.sync();

// db.sync({ alter: true, force: true });

export default Training;

export type TrainingType = {
  id: number;
  code: string;
  title: string;
  modality: "Online" | "On-Site" | string;
  currentPopulation: number;
  maxPopulation: number;
  instructor: string;
  status: string;
  url: string;
  image: string;
};

export async function dropTraining(id: number) {
  Training.destroy({ where: { id: id } });
}

export async function updateTraining(
  trainingId: number,
  data: TrainingFormInput
) {
  try {
    const updateData: any = {
      code: data.code,
      title: data.title,
      modality: data.modality,
      maxPopulation: data.maxPopulation,
      instructor: data.instructor,
      status: data.status,
      url: data.url,
    };

    if (data.image !== null) {
      updateData.image = data.image;
    }

    await Training.update(updateData, { where: { id: trainingId } });
  } catch (error) {
    console.error("Error: updating training:", error);
  }
}

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
          url: data.getDataValue("url"),
          image: data.getDataValue("image"),
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

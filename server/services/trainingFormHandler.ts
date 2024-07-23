"use server";
import { TrainingFormInput } from "@/lib/definitions";
import Training from "@/lib/models/Training";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  title: z.string().min(1),
  code: z.string().min(1),
  modality: z.string(),
  instructor: z.string().min(1),
  maxPopulation: z.number(),
  status: z.boolean(),
  url: z.string().min(1),
});

export async function validateFormInput(formInput: TrainingFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newTrainingHandler(formInput: TrainingFormInput) {
  try {
    // Transform the form data to match the custom user schema
    const newTraining = Training.build({
      code: formInput.code,
      title: formInput.title,
      modality: formInput.modality,
      maxPopulation: formInput.maxPopulation,
      instructor: formInput.instructor,
      status: formInput.status,
      url: formInput.url,
    });

    // Save the new user to the database
    // console.log(newUser)
    await newTraining.save();

    console.log("New training created:", newTraining);

    // return newUser;
  } catch (error) {
    console.error("Error creating new training:", error);
    // return { success: false, message: "Failed to create user", error: error.message };
  }
}

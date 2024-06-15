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
});

export async function newTrainingHandler(formInput: TrainingFormInput) {
  try {
    // Validate the form data
    const validatedInput = formInputSchema.parse(formInput);

    // Transform the form data to match the custom user schema
    const newTraining = Training.build({
      code: validatedInput.code,
      title: validatedInput.title,
      modality: validatedInput.modality,
      maxPopulation: validatedInput.maxPopulation,
      instructor: validatedInput.instructor,
      status: validatedInput.status,
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

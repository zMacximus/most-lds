"use server";
import { UserTrainingInput } from "@/lib/definitions";
import AdminForm from "@/lib/models/AdminForm";
import UserTrainings from "@/lib/models/UserTraining";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  name: z.string().min(1),
  dateOfTraining: z.date(),
  employee: z.string().min(1),
});

export async function validateFormInput(formInput: UserTrainingInput) {
  return formInputSchema.parse(formInput);
}

export async function newUserTrainingFormHandler(formInput: UserTrainingInput) {
  try {
    // Validate the form data
    // const validatedInput = formInputSchema.parse(formInput);

    // Transform the form data to match the custom user schema
    const newUserTrainingForm = UserTrainings.build({
      id: null,
      name: formInput.name,
      dateOfTraining: formInput.dateOfTraining,
      employee: formInput.employee,
    });

    // Save the new user to the database
    // console.log(newUser)
    await newUserTrainingForm.save();

    console.log("New user training form created:", newUserTrainingForm);

    // return newUser;
  } catch (error) {
    console.error("Error creating user training form:", error);
    // return { success: false, message: "Failed to create user", error: error.message };
  }
}

"use server";
import { IDPFormInput } from "@/lib/definitions";
import IDPForm from "@/lib/models/IDPForm";
import { z } from "zod";

// Define your schema using Zod
const formInputSchema = z.object({
  name: z.string().min(1),
  submittedBy: z.string().min(1),
  position: z.string().min(1),
  yearsInThePosition: z.number().nonnegative(),
  division: z.string().min(1),
  objectives: z.string(),
  areasOfStrength: z.string(),
  areasOfDevelopment: z.string(),
  targetCompetencyTraining: z.string(),
  targetScheduleOfCompletion: z.date(),
  formStatus: z.number(), // Optional because it has a default value in the model
});

export async function validateFormInput(formInput: IDPFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newIDPFormHandler(formInput: IDPFormInput) {
  try {
    // Validate the form data
    const validatedInput = formInputSchema.parse(formInput);

    // Transform the form data to match the custom user schema
    const newIDPForm = IDPForm.build({
      id: null,
      name: validatedInput.name,
      submittedBy: validatedInput.submittedBy,
      position: validatedInput.position,
      yearsInThePosition: validatedInput.yearsInThePosition,
      division: validatedInput.division,
      objectives: validatedInput.objectives || null,
      areasOfStrength: validatedInput.areasOfStrength || null,
      areasOfDevelopment: validatedInput.areasOfDevelopment || null,
      targetCompetencyTraining: validatedInput.targetCompetencyTraining || null,
      targetScheduleOfCompletion: validatedInput.targetScheduleOfCompletion,
      formStatus: validatedInput.formStatus || 0,
    });

    // Save the new form to the database
    await newIDPForm.save();

    console.log("New IDP form created:", newIDPForm);
  } catch (error) {
    console.error("Error creating new IDP form:", error);
  }
}

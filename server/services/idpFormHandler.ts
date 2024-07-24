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
  notedBy: z.string().min(1),
});

export async function validateFormInput(formInput: IDPFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newIDPFormHandler(formInput: IDPFormInput) {
  try {
    // Validate the form data
    // const validatedInput = formInputSchema.parse(formInput);

    // Transform the form data to match the custom user schema
    const newIDPForm = IDPForm.build({
      id: null,
      name: formInput.name,
      submittedBy: formInput.submittedBy,
      position: formInput.position,
      yearsInThePosition: formInput.yearsInThePosition,
      division: formInput.division,
      objectives: formInput.objectives || null,
      areasOfStrength: formInput.areasOfStrength || null,
      areasOfDevelopment: formInput.areasOfDevelopment || null,
      targetCompetencyTraining: formInput.targetCompetencyTraining || null,
      targetScheduleOfCompletion: formInput.targetScheduleOfCompletion,
      formStatus: formInput.formStatus || 0,
      notedBy: formInput.notedBy,
    });

    // Save the new form to the database
    await newIDPForm.save();

    console.log("New IDP form created:", newIDPForm);
  } catch (error) {
    console.error("Error creating new IDP form:", error);
  }
}

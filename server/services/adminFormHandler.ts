"use server";
import { AdminFormInput } from "@/lib/definitions";
import AdminForm from "@/lib/models/AdminForm";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  employeeName: z.string().min(1),
  division: z.string().min(1),
  position: z.string().min(1),
  employmentStatus: z.string().min(1),
  officerInCharge: z.string().min(1),
  titleOfLD: z.string().min(1),
  dateOfLD: z.date(),
  venue: z.string().min(1),
  numberOfHours: z.number(),
  serviceProvider: z.string().min(1),
  modeOfLD: z.string().min(1),
  level: z.string().min(1),
  natureOfParticipation: z.string().min(1),
  typeOfLD: z.string().min(1),
  sponsored: z.boolean(),
  withinJobDesc: z.boolean(),
  recentLD: z.boolean(),
  previousLD: z.any(),
  previousLDDate: z.any(),
  previousLDVenue: z.any(),
  prevLDPostFormSubmitted: z.any(),
  postLDReEcho: z.boolean(),
  postFormSubmission: z.boolean(),
  // formStatus: boolean,
  submittedBy: z.string().min(1),
  sign1: z.string().min(1),
  // sign1Status: z.number(),
  sign2: z.string().min(1),
  // sign2Status: z.number(),
  sign3: z.string().min(1),
  // sign3Status: z.number(),
});

export async function validateFormInput(formInput: AdminFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newAdminFormHandler(formInput: AdminFormInput) {
  try {
    // Validate the form data
    // const validatedInput = formInputSchema.parse(formInput);

    // Transform the form data to match the custom user schema
    const newAdminForm = AdminForm.build({
      id: null,
      employeeName: formInput.employeeName,
      division: formInput.division,
      position: formInput.position,
      employmentStatus: formInput.employmentStatus,
      officerInCharge: formInput.officerInCharge,
      titleOfLD: formInput.titleOfLD,
      dateOfLD: formInput.dateOfLD,
      venue: formInput.venue,
      numberOfHours: formInput.numberOfHours,
      serviceProvider: formInput.serviceProvider,
      modeOfLD: formInput.modeOfLD,
      level: formInput.level,
      natureOfParticipation: formInput.natureOfParticipation,
      typeOfLD: formInput.typeOfLD,
      sponsored: formInput.sponsored,
      withinJobDesc: formInput.withinJobDesc,
      recentLD: formInput.recentLD,
      previousLD: formInput.previousLD,
      previousLDDate: formInput.previousLDDate,
      previousLDVenue: formInput.previousLDVenue,
      prevLDPostFormSubmitted: formInput.prevLDPostFormSubmitted,
      postLDReEcho: formInput.postLDReEcho,
      postFormSubmission: formInput.postFormSubmission,
      formStatus: 1,
      //   UserUsername: validatedInput.submittedBy,
      submittedBy: formInput.submittedBy,
      sign1: formInput.sign1,
      sign1Status: 1,
      sign2: formInput.sign2,
      sign2Status: 1,
      sign3: formInput.sign3,
      sign3Status: 1,
    });

    // Save the new user to the database
    // console.log(newUser)
    await newAdminForm.save();

    console.log("New admin form created:", newAdminForm);

    // return newUser;
  } catch (error) {
    console.error("Error creating new admin form:", error);
    // return { success: false, message: "Failed to create user", error: error.message };
  }
}

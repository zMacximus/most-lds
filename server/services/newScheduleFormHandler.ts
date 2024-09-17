"use server";
import { ScheduleFormInput } from "@/lib/definitions";
import { Schedule } from "@/lib/models/Schedule";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  // id: z.number(),
  //   id: number;
  //   icon: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),
  training_id: z.number(),
  scheduledBy: z.string(),
  //   status: z.number(),
});

export async function validateFormInput(formInput: ScheduleFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newScheduleHandler(formInput: ScheduleFormInput) {
  try {
    const newSched = await Schedule.create({
      //   id: formInput.id,
      //   icon: formInput.icon,
      title: formInput.title,
      subtitle: formInput.subtitle,
      startDate: formInput.startDate,
      endDate: formInput.endDate,
      description: formInput.description,
      training_id: formInput.training_id,
      scheduledBy: formInput.scheduledBy,
      //   status: formInput.status,
    });

    console.log("New schedule created:", newSched);

    return { success: true, user: newSched };
  } catch (error) {
    console.error("Error creating new schedule:", error);
    return {
      success: false,
      message: "Failed to create schedule",
      error: error,
    };
  }
}

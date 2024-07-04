"use server";
import { EmployeeFormInput, TopicFormInput } from "@/lib/definitions";
import { DefineMainTopicDB } from "@/lib/models/MainTopic";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  topicTitle: z.string().min(1),
  categoryName: z.string().min(1),
});

export async function validateFormInput(formInput: TopicFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newTopicHandler(formInput: TopicFormInput) {
  try {
    // Transform the form data to match the custom user schema
    const newTopic = (await DefineMainTopicDB(formInput.categoryName)).build({
      topicTitle: formInput.topicTitle,
    });

    // Save the new user to the database
    await newTopic.save();

    console.log("New user created:", newTopic);

    // Return the new user or success message
    return { success: true, user: newTopic };
  } catch (error) {
    console.error("Error creating new user:", error);
    return {
      success: false,
      message: "Failed to create user",
      error: error,
    };
  }
}

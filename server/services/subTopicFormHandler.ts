"use server";
import {
  EmployeeFormInput,
  SubTopicFormInput,
  TopicFormInput,
} from "@/lib/definitions";
import { DefineSubTopicDB } from "@/lib/models/SubTopic";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  // id: z.number(),
  subTopicTitle: z.string().min(1),
  url: z.string().min(1),
  typeOfContent: z.number(),
  mainTopicId: z.number(),
  categoryName: z.string().min(1),
  uploadedBy: z.string().min(1),
});

export async function validateFormInput(formInput: SubTopicFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newSubTopicHandler(
  formInput: SubTopicFormInput,
  categoryName: string
) {
  try {
    // let embedUrl: string = "";
    // if (formInput.typeOfContent === 0) {
    //   embedUrl = await convertVideoURL(formInput.url);
    // } else if (formInput.typeOfContent === 1) {
    //   embedUrl = await convertPDFURL(formInput.url);
    // }
    // console.log("INITIAL URL: ", formInput.url);
    // console.log("NEW URL: ", embedUrl);

    const newTopic = (await DefineSubTopicDB()).create({
      subTopicTitle: formInput.subTopicTitle,
      url: formInput.url,
      typeOfContent: formInput.typeOfContent,
      mainTopicId: formInput.mainTopicId,
      categoryName: categoryName,
      uploadedBy: formInput.uploadedBy,
    });

    console.log("New user created:", newTopic);

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

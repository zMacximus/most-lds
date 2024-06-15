"use server";
import { EmployeeFormInput } from "@/lib/definitions";
import User from "@/lib/models/User";
import { z } from "zod";
// import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  admin: z.boolean(),
  department: z.string().min(1),
  title: z.string().min(1),
  address: z.string().min(1),
  religion: z.string().min(1),
  birthDay: z.date(), // Assuming it's a string; adjust if it's a Date object
  joinDate: z.date(), // Assuming it's a string; adjust if it's a Date object
});

export async function newEmployeeHandler(formInput: EmployeeFormInput) {
  try {
    // Validate the form data
    const validatedInput = formInputSchema.parse(formInput);

    // Generate the username
    const firstNameInitials = validatedInput.firstName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .map((name) => name[0].toLowerCase())
      .join("");

    const lastNamePart = validatedInput.lastName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .join("");

    const username = `${firstNameInitials}${lastNamePart}`;

    // Hash the password
    // const hashedPassword = await bcrypt.hash("most2024", 10);

    // Transform the form data to match the custom user schema
    const newUser = User.build({
      username: username,
      password: "most2024",
      admin: validatedInput.admin,
      firstName: validatedInput.firstName,
      lastName: validatedInput.lastName,
      department: validatedInput.department,
      title: validatedInput.title,
      address: validatedInput.address,
      religion: validatedInput.religion,
      birthDay: validatedInput.birthDay,
      joinDate: validatedInput.joinDate,
    });

    // Save the new user to the database
    // console.log(newUser)
    await newUser.save();

    console.log("New user created:", newUser);

    // return newUser;
  } catch (error) {
    console.error("Error creating new user:", error);
    // return { success: false, message: "Failed to create user", error: error.message };
  }
}

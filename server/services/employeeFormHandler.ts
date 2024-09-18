"use server";
import { EmployeeFormInput } from "@/lib/definitions";
import User from "@/lib/models/User";
import { z } from "zod";
import bcrypt from "bcrypt";

// Define your schema using Zod
const formInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().optional(),
  password: z.string().optional(), // Optional because it might be generated/hashed later
  admin: z.boolean(),
  department: z.string().optional(),
  title: z.string().optional(),
  employmentStatus: z.string().optional(),
  phoneNumber: z.string().optional(),
  maritalStatus: z.string().optional(),
  address: z.string().optional(),
  religion: z.string().optional(),
  birthDay: z.date().optional(), // Assuming it's a Date object
  joinDate: z.date().optional(), // Assuming it's a Date object
  image: z.any(),
});

export async function validateFormInput(formInput: EmployeeFormInput) {
  return formInputSchema.parse(formInput);
}

export async function newEmployeeHandler(formInput: EmployeeFormInput) {
  try {
    // Validate the form data
    // const validatedInput = formInputSchema.parse(formInput);

    // Generate the username
    const firstNameInitials = formInput.firstName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .map((name) => name[0].toLowerCase())
      .join("");

    const lastNamePart = formInput.lastName
      .split(/[\s-]+/) // Split by spaces or hyphens
      .join("");

    const username = `${firstNameInitials}${lastNamePart}`;

    // Hash the password (uncomment if bcrypt is used)
    // const hashedPassword = await bcrypt.hash("most2024", 10);

    // Transform the form data to match the custom user schema
    const hashedPassword = await bcrypt.hash("most2024", 10);

    const newUser = User.build({
      username: username,
      email: formInput.email, // Adjust as necessary
      password: hashedPassword, // Replace with hashedPassword if bcrypt is used
      admin: formInput.admin,
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      department: formInput.department,
      title: formInput.title,
      address: formInput.address,
      religion: formInput.religion,
      birthDay: formInput.birthDay,
      joinDate: formInput.joinDate,
      employmentStatus: formInput.employmentStatus, // Default value; adjust as necessary
      phoneNumber: formInput.phoneNumber, // Placeholder; adjust as necessary
      maritalStatus: formInput.maritalStatus, // Placeholder; adjust as necessary,
      image: formInput.image,
    });

    // Save the new user to the database
    await newUser.save();

    console.log("New user created:", newUser);

    // Return the new user or success message
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error creating new user:", error);
    return {
      success: false,
      message: "Failed to create user",
      error: error,
    };
  }
}

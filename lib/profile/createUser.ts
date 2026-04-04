"use server";
import Profile from "@/models/profile";
import bcrypt from "bcryptjs";
import { validateSignUpData } from "@/util/validation";
import connectionToDataBase from "../monogdb";

import { FormState } from "@/types/auth";

export async function createUser(
  prevSate: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await connectionToDataBase();

    const signUpData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const errors = validateSignUpData(signUpData);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    const existingProfile = await Profile.findOne({ email: signUpData.email });
    if (existingProfile) {
      return {
        status: "error",
        message: "user already exist!.",
      };
    }

    const hashedPassword = await bcrypt.hash(signUpData.password, 12);

    const newProfile = new Profile({
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      phoneNumber: signUpData.phoneNumber,
      password: hashedPassword,
    });
    await newProfile.save();

    return {
      status: "success",
      message: "Account created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

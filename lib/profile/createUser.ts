"use server";

import axios from "axios";
import Profile from "@/models/profile";
import bcrypt from "bcryptjs";
import { validateSignUpData } from "@/util/validation";
import connectionToDataBase from "../monogdb";

import { FormState } from "@/@types/auth";
import formatPhoneNumber from "@/util/phoneNumberFormatter";

export async function createUser(
  prevState: FormState,
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
    const formattedPhoneNumber = formatPhoneNumber(signUpData.phoneNumber);

    const data = {
      expiry: 5,
      length: 6,
      medium: "sms",
      message: `DriveElite Sign in Verification. Your verification code is %otp_code%. This code expires in 5 minutes. Do not share this code with anyone.`,
      number: formattedPhoneNumber,
      sender_id: "DriveElite",
      type: "numeric",
    };

    const headers = {
      "api-key": process.env.NEXT_PUBLIC_ARKESEL_API_KEY,
    };

    const response = await axios.post(
      "https://sms.arkesel.com/api/otp/generate",
      data,
      { headers },
    );

    if (!response.data || response.data.code !== "1000") {
      console.log(response.data);
      return {
        status: "error",
        message: "Failed to send SMS OTP. Try again later.",
        details: response.data,
      };
    }

    const newProfile = new Profile({
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      phoneNumber: formattedPhoneNumber,
      password: hashedPassword,
      isVerified: false,
    });

    await newProfile.save();

    return {
      status: "success",
      message: "Account created. Please verify your email.",
      data: {
        email: signUpData.email,
        phoneNumber: formattedPhoneNumber,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

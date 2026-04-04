"use server";

import Profile from "@/models/profile";
import connectionToDataBase from "../monogdb";
import { validateSignInData } from "@/util/validation";

import { SignInFormState } from "@/types/auth";

export async function signInUser(
  prevSate: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  try {
    await connectionToDataBase();

    const signInData = {
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      authMethod: formData.get("authMethod") as string,
    };

    const errors = validateSignInData(signInData);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    if (signInData.authMethod === "email") {
      const user = await Profile.findOne({ email: signInData.email });

      if (!user) {
        return {
          status: "error",
          message:
            "Incorrect email or phone number. Please check and try again.",
        };
      }
    }

    if (signInData.authMethod === "phone") {
      const user = await Profile.findOne({
        phoneNumber: signInData.phoneNumber,
      });

      if (!user) {
        return {
          status: "error",
          message:
            "Incorrect email or phone number. Please check and try again.",
        };
      }
    }

    return {
      status: "success",
      message: "OTP sent successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong. Try again.",
    };
  }
}

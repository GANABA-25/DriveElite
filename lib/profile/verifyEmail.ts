"use server";

import Profile from "@/models/profile";
import connectionToDataBase from "../monogdb";

type FormState = {
  status?: "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

export async function verifyEmail(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await connectionToDataBase();

    const token = formData.get("token") as string;
    const email = formData.get("email") as string;

    const user = await Profile.findOne({
      email,
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return {
        status: "error",
        message: "Invalid or expired verification link",
      };
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return {
      status: "success",
      message: "Email verified successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Verification failed",
    };
  }
}

"use server";

import axios from "axios";
import jwt from "jsonwebtoken";
import Profile from "@/models/profile";
import connectionToDataBase from "../monogdb";
import { cookies } from "next/headers";

import { FormState } from "@/@types/auth";

export async function VerifyOtp(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await connectionToDataBase();

    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const otp = formData.get("Otp") as string;

    if (!email || !phoneNumber || !otp) {
      return {
        status: "error",
        message: "All fields are required",
      };
    }

    const user = await Profile.findOne({ email });

    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const response = await axios.post(
      "https://sms.arkesel.com/api/otp/verify",
      {
        api_key: process.env.NEXT_PUBLIC_ARKESEL_API_KEY,
        code: otp,
        number: phoneNumber,
      },
      {
        headers: {
          "api-key": process.env.NEXT_PUBLIC_ARKESEL_API_KEY,
        },
      },
    );

    const code = response.data?.code;

    if (code === "1104") {
      return {
        status: "error",
        message: "Incorrect OTP. Please try again.",
      };
    }

    if (code === "1103") {
      return {
        status: "error",
        message: "OTP expired. Request a new one.",
      };
    }

    if (code === "1106") {
      return {
        status: "error",
        message: "Verification service unavailable. Try again later.",
      };
    }

    if (code === "1100") {
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;

      await user.save();

      const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET not set");

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        secret,
        { expiresIn: "7d" },
      );

      (await cookies()).set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_COOKIES === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        status: "success",
        message: "Sign in successfully",
        profile: {
          userId: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      };
    }

    return {
      status: "error",
      message: "Verification failed. Try again.",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

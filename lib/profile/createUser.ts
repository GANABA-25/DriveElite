"use server";
import Profile from "@/models/profile";
import bcrypt from "bcryptjs";
import { validateSignUpData } from "@/util/validation";
import connectionToDataBase from "../monogdb";
import { sendEmail } from "../sendEmail";
import crypto from "crypto";

import { FormState } from "@/types/auth";
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
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newProfile = new Profile({
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      phoneNumber: formattedPhoneNumber,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
      isVerified: false,
    });
    await newProfile.save();

    await sendEmail({
      to: signUpData.email,
      subject: "Verify Your DriveElite Account ✅",
      text: `DriveElite Email Verification
    
    Your verification link:
    ${process.env.FRONTEND_URL}/verifyEmail?token=${verificationToken}&email=${signUpData.email}
    
    This link expires in 24 hours.
    Do not share this link with anyone.`,
      html: `
        <div style="font-family:Arial;">
          <h2>Hello ${signUpData.firstName} 👋</h2>
          <p>Thank you for signing up at <b>DriveElite</b>.</p>
    
          <p>Please verify your email by clicking the button below:</p>
    
          <a href="${process.env.NEXT_PUBLIC_VERIFY_EMAIL_URI}/verifyEmail?token=${verificationToken}&email=${signUpData.email}"
            style="
              background:#FACC15;
              padding:12px 20px;
              text-decoration:none;
              font-weight:bold;
              border-radius:6px;
              color:#000;
              display:inline-block;
            ">
            Verify Email
          </a>
    
          <p>This link expires in 24 hours.</p>
          <p>If you didn't create this account, ignore this email.</p>
        </div>
      `,
    });

    return {
      status: "success",
      message: "Account created. Please verify your email.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

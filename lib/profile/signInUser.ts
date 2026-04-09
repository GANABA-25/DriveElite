"use server";

import Profile from "@/models/profile";
import connectionToDataBase from "../monogdb";
import { validateSignInData } from "@/util/validation";
import { sendEmail } from "../sendEmail";
import axios from "axios";

import { SignInFormState } from "@/types/auth";
import formatPhoneNumber from "@/util/phoneNumberFormatter";

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

    let user;

    if (signInData.authMethod === "email") {
      user = await Profile.findOne({ email: signInData.email });

      if (!user) {
        return {
          status: "error",
          message:
            "Incorrect email or phone number. Please check and try again.",
        };
      }

      const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      const otp = generateOtp();

      user.loginOtp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
      await user.save();

      await sendEmail({
        to: user.email,
        subject: "DriveElite Sign In Verification Code",
        text: `DriveElite Sign In Verification
      Your verification code is: ${otp}
      This code expires in 5 minutes.
      Do not share this code with anyone.`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h3>DriveElite Sign In Verification</h3>
            <p>Your verification code is:</p>
            <h2 style="letter-spacing: 3px;">${otp}</h2>
            <p>This code expires in 5 minutes.</p>
            <p><strong>Do not share this code with anyone.</strong></p>
          </div>
        `,
      });
    }

    if (signInData.authMethod === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(signInData.phoneNumber);

      user = await Profile.findOne({
        phoneNumber: formattedPhoneNumber,
      });

      if (!user) {
        return {
          status: "error",
          message:
            "Incorrect email or phone number. Please check and try again.",
        };
      }

      const data = {
        expiry: 5,
        length: 6,
        medium: "sms",
        message: `DriveElite Sign in Verification. Your verification code is %otp_code%. This code expires in 5 minutes. Do not share this code with anyone.`,
        number: user.phoneNumber,
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
    }

    return {
      status: "success",
      message: "OTP sent successfully",
      data: {
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong. Try again.",
    };
  }
}

"use server";

import connectionToDataBase from "../monogdb";

import { FormState } from "@/@types/auth";
export async function carBookings(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await connectionToDataBase();
    const bookingData = {};
    return {
      status: "success",
      message: "Booking was completed. Check email for confirmation",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

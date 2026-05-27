"use server";

import connectionToDataBase from "../monogdb";

interface paymentDataTypes {
  status?: "success" | "error";
  message?: string;
}

export async function processPayment(
  prevState: paymentDataTypes,
  formData: FormData,
): Promise<paymentDataTypes> {
  try {
    await connectionToDataBase();

    const bookingData = {
      bookingData: formData.get("bookingData"),
    };

    return {
      status: "success",
      message: "Payment completed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

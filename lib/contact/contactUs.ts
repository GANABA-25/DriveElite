"use server";

import ContactMessage from "@/models/contactUs";
import connectionToDataBase from "../monogdb";
import { contactFormSate } from "@/@types/auth";
import { validateContactMessageData } from "@/util/validation";

export async function contactUs(
  prevState: contactFormSate,
  formData: FormData,
): Promise<contactFormSate> {
  try {
    await connectionToDataBase();

    const contactData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      subject: (formData.get("subject") as string) || "",
      message: formData.get("message") as string,
    };

    const errors = validateContactMessageData(contactData);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    await ContactMessage.create({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phoneNumber: contactData.phoneNumber,
      subject: contactData.subject,
      message: contactData.message,
    });

    return {
      status: "success",
      message: "Message sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

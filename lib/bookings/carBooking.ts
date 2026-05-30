"use server";

import connectionToDataBase from "../monogdb";
import Booking from "@/models/booking";
import { bookingFormState } from "@/@types/bookingTypes";
import { validateAllBookingData } from "@/util/validation";

export async function carBookings(
  prevState: bookingFormState,
  formData: FormData,
): Promise<bookingFormState> {
  try {
    await connectionToDataBase();

    const extrasRaw = formData.get("extras") as string;

    const extras = extrasRaw ? JSON.parse(extrasRaw) : {};

    const bookingData = {
      stage: formData.get("stage") as string,
      pickupDate: formData.get("pickupDate") as string,
      returnDate: formData.get("returnDate") as string,
      pickupTime: formData.get("pickupTime") as string,
      returnTime: formData.get("returnTime") as string,
      pickupLocation: formData.get("pickupLocation") as string,
      returnLocation: formData.get("returnLocation") as string,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      address: formData.get("address") as string,
      ghanaCard: formData.get("ghanaCard") as string,
      driverLicense: formData.get("driverLicense") as string,
      fleetId: formData.get("fleetId") as string,
      extras: {
        gps: !!extras.gps,
        childSeat: !!extras.childSeat,
        additionalDriver: !!extras.additionalDriver,
        fullInsurance: !!extras.fullInsurance,
      },
    };

    console.log("checking booking data on server:", bookingData);

    const errors = validateAllBookingData(bookingData);

    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "Please fix the errors below",
        errors,
      };
    }

    const booking = await Booking.create(bookingData);

    return {
      status: "success",
      message: "Booking was completed. Check email for confirmation",
      booking,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Internal server error. Try again later!",
    };
  }
}

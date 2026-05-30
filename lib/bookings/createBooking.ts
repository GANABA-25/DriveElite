"use server";

import connectionToDataBase from "../monogdb";
import Booking from "@/models/booking";
import Fleets from "@/models/fleets";
import { bookingFormState } from "@/@types/bookingTypes";
import { validateAllBookingData } from "@/util/validation";
import { computeTotalPrice } from "@/components/computeTotalPrice";

export async function createBooking(
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

    const errors = validateAllBookingData(bookingData);
    if (Object.values(errors).some((error) => error !== "")) {
      return {
        status: "error",
        message: "error detected in booking data. Please fix the errors below",
        errors,
      };
    }

    const existingFleet = await Fleets.findById(bookingData.fleetId);
    if (!existingFleet) {
      return {
        status: "error",
        message:
          "Selected fleet does not exist. Please select a another fleet!.",
      };
    }

    const existingBooking = await Booking.findOne({
      fleetId: bookingData.fleetId,
      bookingStatus: {
        $in: ["pending", "confirmed"],
      },

      pickupDate: {
        $lte: new Date(bookingData.returnDate),
      },

      returnDate: {
        $gte: new Date(bookingData.pickupDate),
      },
    });

    if (existingBooking) {
      return {
        status: "error",
        message:
          "This vehicle is unavailable for the selected pickup and return dates.",
      };
    }

    const data = computeTotalPrice({
      bookingData,
      carPrice: existingFleet.price,
    });

    const newBookingData = new Booking({
      pickupDate: bookingData.pickupDate,
      returnDate: bookingData.returnDate,
      pickupTime: bookingData.pickupTime,
      returnTime: bookingData.returnTime,
      pickupLocation: bookingData.pickupLocation,
      returnLocation: bookingData.returnLocation,
      fullName: bookingData.fullName,
      email: bookingData.email,
      phoneNumber: bookingData.phoneNumber,
      address: bookingData.address,
      ghanaCard: bookingData.ghanaCard,
      driverLicense: bookingData.driverLicense,
      fleetId: bookingData.fleetId,
      extras: bookingData.extras,
      totalDays: data.days,
      dailyRate: existingFleet.price,
      totalPrice: data.totalPrice,
      bookingReference: `BK-${Date.now()}`,
    });

    await newBookingData.save();

    return {
      status: "success",
      message: "Booking was completed. Check email for confirmation",
      booking: {
        bookingId: newBookingData._id.toString(),
        bookingReference: newBookingData.bookingReference,
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

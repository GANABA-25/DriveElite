import connectionToDataBase from "@/lib/monogdb";
import Booking from "@/models/booking";

export async function getBookings({ bookingId }: { bookingId: string }) {
  await connectionToDataBase();

  const booking = await Booking.findById(bookingId)
    .select(
      "fleetId pickupDate returnDate pickupTime returnTime totalDays dailyRate totalPrice bookingReference",
    )
    .lean();

  if (!booking) return null;

  return {
    fleetId: booking.fleetId,
    pickupDate: booking.pickupDate,
    returnDate: booking.returnDate,
    pickupTime: booking.pickupTime,
    returnTime: booking.returnTime,
    totalDays: booking.totalDays,
    dailyRate: booking.dailyRate,
    totalPrice: booking.totalPrice,
    bookingReference: booking.bookingReference,
  };
}

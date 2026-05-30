import { getSingleFleet } from "@/lib/fleets/getFleets";
import { getBookings } from "@/lib/bookings/getBookings";
import PaymentDetails from "./paymentDetails";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const booking = await getBookings({ bookingId: slug });

  if (!booking) {
    notFound();
  }

  const fleet = await getSingleFleet({
    fleetId: booking.fleetId.toString(),
  });

  return <PaymentDetails fleet={fleet} booking={booking} />;
}

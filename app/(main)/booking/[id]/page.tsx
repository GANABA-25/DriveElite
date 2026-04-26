import { getFleets } from "@/lib/fleets/getFleets";
import BookingClient from "./BookingClient";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const fleets = await getFleets();

  console.log("checking params", id);

  const car = fleets.find((c) => c._id.toString() === id);

  if (!car) return <p>Car not found</p>;

  return <BookingClient car={car} />;
}

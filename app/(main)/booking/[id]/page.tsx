import { getFleets } from "@/lib/fleets/getFleets";
import BookingClient from "./BookingClient";
import { fleetFiltersDataTypes } from "@/@types/fleet.types";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const fleets = await getFleets();

  const car = fleets.find(
    (c: fleetFiltersDataTypes) => c._id.toString() === id,
  );

  if (!car) return <p>Car not found</p>;

  return <BookingClient car={car} />;
}

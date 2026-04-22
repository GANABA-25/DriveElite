import FleetDetailsClient from "./fleetDetails";
import { getFleets } from "@/lib/fleets/getFleets";

export default async function FleetDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const fleets = await getFleets();

  return <FleetDetailsClient slug={slug} fleets={fleets} />;
}

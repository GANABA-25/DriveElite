import { getSingleFleet } from "@/lib/fleets/getFleets";
import PaymentDetails from "./paymentDetails";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const fleet = await getSingleFleet({ fleetId: slug });

  return <PaymentDetails fleet={fleet} />;
}

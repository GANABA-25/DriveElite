import { getFleets } from "@/lib/fleets/getFleets";
import { Suspense } from "react";
import FleetFilters from "./fleetFilters";
import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import LoadingCard from "@/components/loadingCard";

export default async function FleetPage() {
  const fleets = await getFleets();

  return (
    <>
      <header className="bg-accent py-12 px-4 lg:px-0">
        <div className="max-w-360 mx-auto flex flex-col gap-4 text-center">
          <h1 className="text-primary text-4xl md:text-5xl font-black">
            Our Premium Fleet
          </h1>
          <p className="text-primary text-base">
            Browse through our collection of luxury vehicles and find the
            perfect car for your journey.
          </p>
        </div>
      </header>

      <Suspense fallback={<LoadingCard length={8} />}>
        <FleetFilters initialFleets={fleets} />
      </Suspense>
    </>
  );
}

"use client";

import {
  Users,
  Fuel,
  Gauge,
  Check,
  Settings,
  Zap,
  Timer,
  Droplets,
  Package,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import Image from "next/image";
import Button from "@/components/button";
import { fleetFiltersDataTypes } from "@/@types/fleet.types";

type Props = {
  slug: string;
  fleets: fleetFiltersDataTypes[];
};

export default function FleetDetailsClient({ slug, fleets }: Props) {
  //   const { data, isPending, isError, error } = useQuery({
  //     queryKey: ["fleets"],
  //     queryFn: () => getUri(process.env.NEXT_PUBLIC_FETCH_FLEETS_URI),
  //   });

  //   if (isPending) {
  //     return (
  //       <div className="flex justify-center items-center">
  //         <h1 className="text-3xl font-black text-primary">Loading fleet .....</h1>
  //       </div>
  //     );
  //   }

  //   if (isError) {
  //     return <p>Something went wrong</p>;
  //   }

  const fleet = fleets?.find((car: fleetFiltersDataTypes) => car._id === slug);

  if (!fleet) {
    return <h1>No Fleets</h1>;
  }

  const relatedCars = fleets?.filter(
    (car: fleetFiltersDataTypes) =>
      car.category === fleet.category && car._id !== slug,
  );

  return (
    <div className="max-w-360 mx-auto flex flex-col gap-20 pt-8 px-4">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="sticky lg:top-24 h-fit">
          <div className="relative w-full h-50 md:h-130 rounded-md overflow-hidden">
            <Image
              src={fleet.imageUrl}
              alt={fleet.name}
              fill
              className="object-cover"
              priority
            />

            <p className="absolute rounded-full text-sm bg-primary p-2 px-4 top-5 left-5">
              {fleet.fuel}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-black">{fleet.name}</h1>
          <div className="flex items-center gap-4 text-base">
            <div className="flex items-center gap-2 text-gray-500">
              <Users size={20} className="text-primary" />
              <p>{fleet.seats} Seats</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Fuel size={20} className="text-primary" />
              <p>{fleet.fuel}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Gauge size={20} className="text-primary" />
              <p>{fleet.speed}</p>
            </div>
          </div>
          <p className="text-gray-500 text-base">{fleet.description}</p>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Features</h1>
            <ul className="grid grid-cols-2 gap-2 text-base text-gray-500">
              {fleet.features.map((data, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={15} className="text-primary" />
                  <li key={index}>{data}</li>
                </div>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Technical Specifications</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 border border-gray-200 shadow-sm rounded-md p-4">
                <Settings size={20} className="text-primary" />
                <p className="text-gray-500 text-base">Engine</p>
                <h1 className="font-medium">{fleet.specs.engine}</h1>
              </div>
              <div className="flex flex-col gap-1 border border-gray-200 shadow-sm rounded-md p-4">
                <Gauge size={20} className="text-primary" />
                <p className="text-gray-500 text-base">Transmission</p>
                <h1 className="font-medium">{fleet.specs.transmission}</h1>
              </div>
              <div className="flex flex-col gap-1 border border-gray-200 shadow-sm rounded-md p-4">
                <Zap size={20} className="text-primary" />
                <p className="text-gray-500 text-base">Horsepower</p>
                <h1 className="font-medium">{fleet.specs.horsepower}</h1>
              </div>
              <div className="flex flex-col gap-1 border border-gray-200 shadow-sm rounded-md p-4">
                <Timer size={20} className="text-primary" />
                <p className="text-gray-500 text-base">Acceleration</p>
                <h1 className="font-medium">{fleet.specs.acceleration}</h1>
              </div>
              <div className="flex flex-col gap-1 border border-gray-200 shadow-sm rounded-md p-4">
                <Droplets size={20} className="text-primary" />
                <p className="text-gray-500 text-base">FuelEconomy</p>
                <h1 className="font-medium">{fleet.specs.fuelEconomy}</h1>
              </div>
              <div className="flex flex-col gap-1 border border-gray-200 shadow-sm rounded-md p-4">
                <Package size={20} className="text-primary" />
                <p className="text-gray-500 text-base">Trunk</p>
                <h1 className="font-medium">{fleet.specs.trunk}</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-gray-200 p-8 rounded-md">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl md:text-5xl">
                <span className="text-[#FACC15] font-bold">${fleet.price}</span>
                <span className="text-gray-500 text-2xl">/day</span>
              </h1>

              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <h1>Fully Insured</h1>
              </div>
            </div>

            <Link
              href={`/booking/${fleet._id}`}
              className="px-4 py-2 rounded-md text-base text-center font-bold transition-transform duration-200 ease-in-out lg:hover:cursor-pointer bg-primary text-black hover:bg-yellow-500 hover:scale-105"
            >
              Book This Car
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          Similar <span className="text-primary">SUV</span> Cars
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedCars.map((cars) => (
            <Link
              href={`/fleet/${cars._id}`}
              key={cars._id}
              className="relative group border border-gray-200 rounded-md shadow-md overflow-hidden transition-all duration-300 ease-out lg:cursor-pointer lg:hover:-translate-y-2 lg:hover:scale-[1.02] lg:hover:shadow-[0_0_40px_rgba(252,244,207,0.9)] lg:hover:ring-1 lg:hover:ring-[#fcf4cf]/60"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={cars.imageUrl}
                  alt={cars.name}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col gap-2 p-6">
                <h1 className="text-2xl font-bold">{cars.name}</h1>

                <div className="flex items-center justify-between">
                  <h1 className="text-xl">
                    <span className="text-[#FACC15] font-bold">
                      ${cars.price}
                    </span>
                    <span className="text-gray-500 text-sm">/day</span>
                  </h1>
                  <Button>View Details</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

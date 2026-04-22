"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/input";
import Button from "@/components/button";
import VehicleCard from "@/components/vehicle-card";

import { fleetFiltersDataTypes } from "@/@types/fleet.types";

type FleetFiltersProps = {
  initialFleets: fleetFiltersDataTypes[];
};

export default function FleetFilters({ initialFleets }: FleetFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Sports", "SUV", "Electric", "Sedan", "Luxury"];

  const filteredCars = initialFleets?.filter((car) => {
    const matchesCategory =
      activeCategory === "All" || car.category === activeCategory;
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="max-w-360 mx-auto flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between lg:items-center px-4 lg:px-0 py-12">
        <form>
          <Input
            name=""
            icon={<Search size={15} />}
            placeholder="Search cars..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border border-gray-200 text-base py-1 px-4 rounded-md transition-all duration-300 ease-out lg:cursor-pointer lg:hover:border-primary lg:hover:scale-105 lg:hover:shadow-md ${
                activeCategory === category
                  ? "bg-primary border-primary shadow-md scale-105"
                  : "bg-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-base text-muted-foreground">
          <span className="text-gray-500">
            {filteredCars?.length}{" "}
            {filteredCars?.length === 1 ? "vehicle" : "vehicles"} available
          </span>
        </div>
      </section>

      <section className="border-y border-gray-200 py-12 px-4 lg:px-0">
        <div className="max-w-360 mx-auto">
          {filteredCars.length === 0 ? (
            <h1 className="text-center text-5xl text-primary font-black">
              No fleets
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCars?.map((car) => (
                <VehicleCard key={car._id} data={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

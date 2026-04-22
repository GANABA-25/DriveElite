import Image from "next/image";
import Button from "@/components/button";
import { MoveRight, MapPin, Calendar, Car, Key } from "lucide-react";
import {
  Shield,
  Zap,
  Clock,
  Headphones,
  DollarSign,
  Award,
} from "lucide-react";
import Link from "next/link";

import { getFleets } from "@/lib/fleets/getFleets";

import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import VehicleCard from "@/components/vehicle-card";
import FeatureCard from "./home/feature-card";
import Step from "../../components/step";

const serviceData = [
  {
    id: 1,
    icon: Shield,
    iconColor: "#FACC15",
    title: "Fully Insured",
    description:
      "Comprehensive coverage on all rentals for your peace of mind.",
  },
  {
    id: 2,
    icon: Zap,
    iconColor: "#FACC15",
    title: "Instant Booking",
    description: "Book your dream car in minutes with our seamless process.",
  },
  {
    id: 3,
    icon: Clock,
    iconColor: "#FACC15",
    title: "24/7 Support",
    description: "Round-the-clock assistance wherever your journey takes you.",
  },
  {
    id: 4,
    icon: Car,
    iconColor: "#FACC15",
    title: "Premium Cars",
    description:
      "Access our top-of-the-line fleet for a luxury driving experience.",
  },
];

const featuresData = [
  {
    id: 1,
    icon: Shield,
    iconColor: "#FACC15",
    title: "Fully Insured",
    description:
      "All our vehicles come with comprehensive insurance coverage for your peace of mind.",
  },
  {
    id: 2,
    icon: Clock,
    iconColor: "#FACC15",
    title: "Flexible Rentals",
    description:
      "Rent by the hour, day, week, or month. We adapt to your schedule.",
  },
  {
    id: 3,
    icon: Headphones,
    iconColor: "#FACC15",
    title: "24/7 Support",
    description:
      "Our dedicated team is available around the clock to assist you.",
  },
  {
    id: 4,
    icon: DollarSign,
    iconColor: "#FACC15",
    title: "Best Prices",
    description:
      "Competitive pricing with no hidden fees. What you see is what you pay.",
  },
  {
    id: 5,
    icon: Award,
    iconColor: "#FACC15",
    title: "Premium Fleet",
    description:
      "Only the finest vehicles from top manufacturers in our collection.",
  },
  {
    id: 6,
    icon: Zap,
    iconColor: "#FACC15",
    title: "Quick Booking",
    description:
      "Book your car in minutes with our streamlined reservation process.",
  },
];

interface fleetFiltersDataTypes {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  seats: number;
  fuel: string;
  speed: string;
  description: string;
  features: string[];
  specs: {
    engine: string;
    transmission: string;
    horsepower: string;
    acceleration: string;
    fuelEconomy: string;
    trunk: string;
  };
}

export default async function Home() {
  const fleets = await getFleets();

  return (
    <div className="">
      <header className="relative w-full py-8 px-4 lg:px-0">
        <Image
          src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1768912138/DriveElite/hero-car_fkbzun.jpg"
          fill
          className="object-cover"
          alt="Premium car rental background"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent z-10" />

        <div className="max-w-360 mx-auto">
          <div className="relative z-20 flex flex-col gap-8">
            <h1 className="bg-[#f3ebc8] p-2 px-4 text-base rounded-full w-71 shadow-md border-[0.01px] border-primary">
              Premium Car Rental Experience
            </h1>

            <h1 className="text-4xl md:text-6xl font-black">
              Drive Your <br />
              <span className="text-primary">Dream Car </span> <br />
              Today
            </h1>

            <p className="text-base text-gray-500">
              Experience luxury and performance with our premium fleet.
              <br className="hidden md:block" />
              From exotic sports cars to elegant sedans, find the perfect ride
              <br className="hidden md:block" />
              for any occasion.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link
                href="/fleet"
                className="bg-primary rounded-md flex items-center gap-2 text-base font-bold py-4 px-8 lg:hover:cursor-pointer transition-transform duration-200 ease-in-out hover:bg-yellow-500 hover:scale-105"
              >
                Explore Fleet <MoveRight />
              </Link>

              <Button className="border border-black rounded-md flex items-center gap-2 text-base py-4 px-8 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:bg-[#0F172A] hover:text-primary hover:shadow-lg lg:cursor-pointer">
                Book a Car
              </Button>
            </div>

            <div className="relative flex justify-center items-center lg:top-30">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-8">
                {serviceData.map((data) => (
                  <FeatureCard
                    key={data.id}
                    icon={data.icon}
                    iconColor={data.iconColor}
                    title={data.title}
                    description={data.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-360 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 pt-20 lg:pt-45">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">500+</h1>
          <p className="text-gray-400 text-base">Premium Cars</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">50+</h1>
          <p className="text-gray-400 text-base">Locations</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">25K+</h1>
          <p className="text-gray-400 text-base">Happy Customers</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">24/7</h1>
          <p className="text-gray-400 text-base">Support</p>
        </div>
      </section>

      <section className="max-w-360 mx-auto flex flex-col gap-14 px-4 lg:px-0 pt-35">
        <div className="flex flex-col gap-4">
          <p className="text-base text-primary">Our Fleet</p>
          <h1 className="text-4xl md:text-5xl font-black">
            Featured <span className="text-primary">Vehicles</span>
          </h1>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <p className="text-gray-500 text-base">
              Choose from our selection of premium vehicles. Each car is
              maintained to <br />
              the highest standards for your comfort and safety.
            </p>
            <Button className="max-[767px]:w-40 text-base border border-gray-400 flex items-center gap-2 py-2 rounded-md px-4 lg:hover:cursor-pointer transition-transform duration-200 ease-in-out hover:border-yellow-500">
              View All Cars
              <MoveRight size={15} />
            </Button>
          </div>
        </div>

        {/* {isPending && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        )} */}

        {/* {isError && (
          <div className="flex items-center justify-center px-4 py-24">
            <div className="flex flex-col items-center text-center max-w-md w-full bg-white shadow-md rounded-2xl p-8 border border-gray-100">
             

              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Unable to connect
              </h2>

              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                We're having trouble reaching the server right now. Please check
                your connection or try again shortly.
              </p>

              <Button
                onClick={() => refetch()}
                className="mt-6 px-6 py-2 rounded-lg bg-primary cursor-pointer text-white hover:opacity-90 transition"
              >
                Retry
              </Button>
            </div>
          </div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleets.slice(0, 4).map((car: fleetFiltersDataTypes) => (
            <VehicleCard key={car._id} data={car} />
          ))}
        </div>
      </section>

      <section className="max-w-360 mx-auto flex flex-col gap-14 px-4 lg:px-0 pt-35">
        <div className="flex justify-center items-center text-center">
          <div className="flex flex-col gap-4">
            <p className="text-base text-primary uppercase">Simple Process</p>
            <h1 className="text-4xl md:text-5xl font-black">
              How It <span className="text-primary">Works</span>
            </h1>
            <p className="text-gray-500 text-base">
              Renting a car has never been easier. Follow these simple steps and
              hit the road in minutes.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute hidden md:block top-13 md:w-130 lg:w-270 md:left-30 left-40 lg:left-40 right-0 h-px bg-primary" />

          <div className="relative flex flex-col gap-8 md:flex-row md:justify-around">
            <Step
              icon={<MapPin size={36} className="text-primary" />}
              number={1}
              title="Choose Location"
              text="Select your pickup location from our 50+ locations worldwide."
            />

            <Step
              icon={<Calendar size={36} className="text-primary" />}
              number={2}
              title="Pick a Date"
              text="Choose your rental dates and duration that fits your schedule."
            />

            <Step
              icon={<Car size={36} className="text-primary" />}
              number={3}
              title="Select Your Car"
              text="Browse our premium fleet and pick your dream car."
            />

            <Step
              icon={<Key size={36} className="text-primary" />}
              number={4}
              title="Drive Away"
              text="Complete the booking and enjoy your premium driving experience."
            />
          </div>
        </div>
      </section>

      <section className="relative max-w-360 mx-auto flex flex-col gap-14 px-4 lg:px-0 pt-35">
        <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />
        <div className="flex justify-center items-center text-center">
          <div className="flex flex-col gap-4">
            <p className="text-base text-primary uppercase">Why DriveElite</p>
            <h1 className="text-4xl md:text-5xl font-black">
              Why <span className="text-primary">Choose Us</span>
            </h1>
            <p className="text-gray-500 text-base">
              We're committed to providing you with an exceptional car rental
              experience from start to finish.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((data) => (
            <FeatureCard
              key={data.id}
              icon={data.icon}
              iconColor={data.iconColor}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

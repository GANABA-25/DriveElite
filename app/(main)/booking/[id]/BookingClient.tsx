"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { computeTotalPrice } from "@/components/computeTotalPrice";

import { ArrowRight, ArrowLeft, Car, Check } from "lucide-react";

import { bookingDataTypes } from "@/@types/auth";
import Button from "@/components/button";
import FirstStep from "../components/firstStep";
import SecondStep from "../components/secondStep";
import LastStep from "../components/lastStep";

type Car = {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
};

type Step = "firstStep" | "secondStep" | "lastStep";

export default function BookingClient({ car }: { car: Car }) {
  const [step, setStep] = useState<Step>("firstStep");
  const steps: Step[] = ["firstStep", "secondStep", "lastStep"];
  const [bookingData, setBookingData] = useState<bookingDataTypes>({
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    returnTime: "",
    pickupLocation: "",
    returnLocation: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    ghanaCard: "",
    driverLicense: "",
    fleetId: car?._id,
    extras: {
      gps: false,
      childSeat: false,
      additionalDriver: false,
      fullInsurance: false,
    },
  });

  const nextStep = () => {
    const index = steps.indexOf(step);
    if (index < steps.length - 1) {
      setStep(steps[index + 1]);
    }
  };

  const prevStep = () => {
    const index = steps.indexOf(step);
    if (index > 0) {
      setStep(steps[index - 1]);
    }
  };

  const extrasConfig = {
    gps: { label: "GPS Navigation", price: 10 },
    childSeat: { label: "Child Seat", price: 15 },
    additionalDriver: { label: "Additional Driver", price: 20 },
    fullInsurance: { label: "Full Insurance", price: 35 },
  };

  const { days, totalPrice } = computeTotalPrice({
    bookingData,
    carPrice: car.price,
  });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="py-8 md:py-12 px-4">
      <header className="flex justify-around items-center mb-10">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary rounded-full text-sm md:text-2xl font-bold">
            {step === "firstStep" ? 1 : <Check />}
          </div>

          <p className="text-xs md:text-base text-gray-500">Date & Location</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary rounded-full text-sm md:text-2xl font-bold">
            {step === "secondStep" ? 2 : step === "lastStep" ? <Check /> : 2}
          </div>
          <p className="text-xs md:text-base text-gray-500">Your Details</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary rounded-full text-sm md:text-2xl font-bold">
            {step === "lastStep" ? 3 : 3}
          </div>
          <p className="text-xs md:text-base text-gray-500">Extra & Reviews</p>
        </div>
      </header>

      <section className="max-w-360 mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4 border border-gray-200 p-4 md:p-8 rounded-md">
          {step === "firstStep" && (
            <FirstStep
              nextStep={nextStep}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          )}

          {step === "secondStep" && (
            <SecondStep
              nextStep={nextStep}
              prevStep={prevStep}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          )}

          {step === "lastStep" && (
            <LastStep
              prevStep={prevStep}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          )}
        </div>

        <div className="sticky lg:top-24 h-fit w-full lg:w-110 border border-gray-200 p-6 rounded-md flex flex-col gap-4">
          <div className="relative h-40 md:h-85 lg:h-50 w-full rounded-md overflow-hidden">
            <Image
              src={car.imageUrl}
              alt={car.name}
              fill
              className="object-cover"
              priority
              sizes="fit"
            />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold">{car.name}</h1>
            <p className="text-gray-500 text-sm">{car.category}</p>
          </div>

          <div className="text-base text-gray-500 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-sm">Daily Rate</h1>
              <h1 className="text-primary text-sm font-bold">${car.price}</h1>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-sm">Duration</h1>
              <h1 className="text-black text-sm">{days} day(s)</h1>
            </div>

            {Object.entries(bookingData.extras).map(([key, value]) => {
              if (!value) return null;

              const extra = extrasConfig[key as keyof typeof extrasConfig];

              return (
                <div key={key} className="flex justify-between items-center">
                  <h1 className="text-sm">{extra.label}</h1>
                  <h1 className="text-black text-sm">+${extra.price}</h1>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 py-2 flex justify-between items-center">
            <h1 className=" font-bold">Total</h1>
            <p className="text-primary text-lg md:text-2xl font-bold">
              ${formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { Check } from "lucide-react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { formatDate } from "@/components/formatDate";

type ExtraKey = "gps" | "childSeat" | "additionalDriver" | "fullInsurance";

type Props = {
  prevStep: () => void;
};

export default function LastStep({
  prevStep,
  bookingData,
  setBookingData,
}: any) {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<ExtraKey, boolean>>({
    gps: false,
    childSeat: false,
    additionalDriver: false,
    fullInsurance: false,
  });

  const extras: {
    key: ExtraKey;
    label: string;
    price: number;
    desc: string;
  }[] = [
    { key: "gps", label: "GPS Navigation", price: 10, desc: "Never get lost" },
    {
      key: "childSeat",
      label: "Child Seat",
      price: 15,
      desc: "Safety first for kids",
    },
    {
      key: "additionalDriver",
      label: "Additional Driver",
      price: 20,
      desc: "Share the driving",
    },
    {
      key: "fullInsurance",
      label: "Full Insurance",
      price: 35,
      desc: "Complete peace of mind",
    },
  ];

  const handleSubmit = () => {
    router.push(`/payment/${bookingData.fleetId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-2xl font-bold">Extras & Review</h1>

      <div className="flex flex-col gap-4">
        {extras.map((extra) => (
          <div
            key={extra.key}
            role="checkbox"
            aria-checked={checked[extra.key]}
            tabIndex={0}
            className={`md:w-165 lg:w-225 flex justify-between items-center border p-4 rounded-md cursor-pointer transition-all ${
              checked[extra.key]
                ? "border-primary bg-primary/20"
                : "border-gray-200 hover:border-primary"
            }`}
            onClick={() => {
              const updatedChecked = {
                ...checked,
                [extra.key]: !checked[extra.key],
              };

              setChecked(updatedChecked);

              setBookingData({
                ...bookingData,
                extras: updatedChecked,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setChecked({
                  ...checked,
                  [extra.key]: !checked[extra.key],
                });
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  checked[extra.key]
                    ? "bg-yellow-400 border-yellow-400"
                    : "border-gray-400"
                }`}
              >
                {checked[extra.key] && <Check className="w-3 h-3 text-white" />}
              </div>

              <div>
                <h1 className="text-sm md:text-base">{extra.label}</h1>
                <p className="text-gray-500 text-xs md:text-sm">{extra.desc}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-sm md:text-base">
                <span className="font-bold">+${extra.price}</span>/day
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4 flex flex-col gap-4">
        <h1 className="text-base font-bold">Booking Summary</h1>

        <ul className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500">Pickup</h1>
            <p className="font-medium">
              {formatDate(bookingData?.pickupDate)} at {bookingData?.pickupTime}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500">Return</h1>
            <p className="font-medium">
              {formatDate(bookingData?.returnDate)} at {bookingData?.returnTime}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500">Pickup Location</h1>
            <p className="font-medium">{bookingData?.pickupLocation}</p>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500">Return Location</h1>
            <p className="font-medium">{bookingData?.returnLocation}</p>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-gray-500">Driver</h1>
            <p className="font-medium">{bookingData?.fullName}</p>
          </div>
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={prevStep}
          className="flex items-center gap-4 border border-gray-200 py-2 px-4 rounded-md font-bold"
        >
          <ArrowLeft size={15} /> Back
        </Button>

        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-base text-center font-bold transition-transform duration-200 ease-in-out lg:hover:cursor-pointer bg-primary text-black hover:bg-yellow-500 hover:scale-105"
        >
          Proceed to payment <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}

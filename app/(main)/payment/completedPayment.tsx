import React from "react";
import { Check } from "lucide-react";
import Button from "@/components/button";

export default function CompletedPayment() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-10">
      <div className="flex justify-center items-center bg-green-500 p-7 rounded-full text-white">
        <Check size={30} />
      </div>
      <h1 className="text-2xl font-black">Booking Confirmed!</h1>
      <p className="text-gray-500">
        Thank you for your booking. A confirmation email has been sent to.
      </p>

      <div className="w-200 border border-gray-200 p-8 rounded-md shadow-md flex flex-col gap-8">
        <h1 className="text-xl font-bold">Booking Details</h1>

        <div className="flex flex-col gap-3">
          <div className=" flex justify-between items-center">
            <h1 className="text-gray-500">Booking Reference</h1>
            <p className="text-xs font-medium">DRV-26985945</p>
          </div>

          <div className=" flex justify-between items-center">
            <h1 className="text-gray-500">Vehicle</h1>
            <p className="text-xs font-medium">Range Rover Sport</p>
          </div>

          <div className=" flex justify-between items-center">
            <h1 className="text-gray-500">Pickup</h1>
            <p className="text-xs font-medium">April 26th, 2026 at</p>
          </div>

          <div className=" flex justify-between items-center">
            <h1 className="text-gray-500">Return</h1>
            <p className="text-xs font-medium">April 26th, 2026 at</p>
          </div>

          <div className=" flex justify-between items-center">
            <h1 className="text-gray-500">Location</h1>
            <p className="text-xs font-medium"></p>
          </div>
        </div>

        <div className="border-t border-gray-200 py-4">
          <div className="flex justify-between items-center">
            <h1 className=" font-bold">Total Paid</h1>
            <p className="text-2xl text-primary font-bold">$199</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button>Back to Home</Button>
        <Button className="border border-gray-200 rounded-md p-2 cursor-pointer lg:hover:border-primary lg:hover:bg-gray-50">
          Browse More Cars
        </Button>
      </div>
    </div>
  );
}

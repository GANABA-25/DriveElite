import Input from "@/components/input";

import { Mail, Phone, MapPinHouse, IdCard, User } from "lucide-react";

export default function SecondStep() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-2xl font-bold">Your Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="John"
          icon={<User size={15} />}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          icon={<Mail size={15} />}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+233 xx xxx xxxx"
          icon={<Phone size={15} />}
        />

        <Input
          label="Address"
          type="text"
          placeholder="eg Ak-320-8463"
          icon={<MapPinHouse size={15} />}
        />
        <Input
          label="Ghana card Number"
          type="text"
          placeholder="eg GHA-739023159-5"
          icon={<IdCard size={15} />}
        />

        <Input
          type="text"
          label="Driver's License Number"
          placeholder="License Number"
          icon={<IdCard size={15} />}
        />
      </div>

      <div className="flex flex-col gap-4 text-base">
        <label className="font-bold text-sm text-gray-600">
          Special Requests (Optional)
        </label>
        <textarea
          className="w-full bg-grayDark rounded-sm border border-gray-300 p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15]"
          placeholder="How can we help you?"
          rows={3}
        />
      </div>
    </div>
  );
}

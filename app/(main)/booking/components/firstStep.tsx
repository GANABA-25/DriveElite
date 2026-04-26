import Input from "@/components/input";
import { useRef } from "react";

import { Calendar, Clock3 } from "lucide-react";

export default function FirstStep() {
  const pickupDateRef = useRef<HTMLInputElement | null>(null);
  const returnDateRef = useRef<HTMLInputElement | null>(null);
  const pickupTimeRef = useRef<HTMLInputElement | null>(null);
  const returnTimeRef = useRef<HTMLInputElement | null>(null);

  const openNativePicker = (ref: any) => {
    if (ref.current?.showPicker) {
      ref.current.showPicker();
    } else {
      ref.current?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-lg md:text-2xl font-bold">Select Date & Location</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          ref={pickupDateRef}
          onClick={() => openNativePicker(pickupDateRef)}
          label="Pickup Date"
          type="date"
          icon={<Calendar size={15} />}
        />
        <Input
          ref={returnDateRef}
          onClick={() => openNativePicker(returnDateRef)}
          label="Return Date"
          type="date"
          icon={<Calendar size={15} />}
        />
        <Input
          ref={pickupTimeRef}
          onClick={() => openNativePicker(pickupTimeRef)}
          label="Pickup Time"
          type="time"
          icon={<Clock3 size={15} />}
        />
        <Input
          ref={returnTimeRef}
          onClick={() => openNativePicker(returnTimeRef)}
          label="Return Time"
          type="time"
          icon={<Clock3 size={15} />}
        />

        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-600">Pickup Location</label>

          <select
            name="subject"
            className="w-full bg-grayDark rounded-md cursor-pointer border border-gray-300 p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15]"
            defaultValue=""
          >
            <option value="" disabled>
              Pickup Location
            </option>
            <option value="Accra - Kotoka International Airport">
              Accra - Kotoka International Airport
            </option>
            <option value="Accra - East Legon">Accra - East Legon</option>
            <option value="Accra - Osu">Accra - Osu</option>
            <option value="Kumasi - City Center">Kumasi - City Center</option>
            <option value="Takoradi - Harbor Area">
              Takoradi - Harbor Area
            </option>
            <option value="Tamale - Airport">Tamale - Airport</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-600">Return Location</label>

          <select
            name="subject"
            className="w-full bg-grayDark rounded-md cursor-pointer border border-gray-300 p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15]"
            defaultValue=""
          >
            <option value="" disabled>
              Return Location
            </option>
            <option value="Accra - Kotoka International Airport">
              Accra - Kotoka International Airport
            </option>
            <option value="Accra - East Legon">Accra - East Legon</option>
            <option value="Accra - Osu">Accra - Osu</option>
            <option value="Kumasi - City Center">Kumasi - City Center</option>
            <option value="Takoradi - Harbor Area">
              Takoradi - Harbor Area
            </option>
            <option value="Tamale - Airport">Tamale - Airport</option>
          </select>
        </div>
      </div>
    </div>
  );
}

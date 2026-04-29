import Input from "@/components/input";
import { useRef, useState } from "react";
import Button from "@/components/button";
import FormError from "@/components/formError";

import { Calendar, Clock3, ArrowRight } from "lucide-react";
import { bookingDataTypes } from "@/@types/auth";
import { bookingDataTypesStageOne } from "@/@types/auth";
import { validateBookingDataStageOne } from "@/util/validation";

type Props = {
  nextStep: () => void;
  bookingData: bookingDataTypesStageOne;
  setBookingData: any;
};

type ErrorType = Partial<Record<keyof bookingDataTypesStageOne, string>>;
type TouchedType = Partial<Record<keyof bookingDataTypesStageOne, boolean>>;

export default function FirstStep({
  nextStep,
  bookingData,
  setBookingData,
}: Props) {
  const [errors, setErrors] = useState<ErrorType>({});
  const [touched, setTouched] = useState<TouchedType>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...bookingData,
      [name]: value,
    };

    setBookingData(updatedValues);

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateBookingDataStageOne(updatedValues);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof bookingDataTypesStageOne],
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateBookingDataStageOne(bookingData);

    const allTouched: TouchedType = {
      pickupDate: true,
      returnDate: true,
      pickupTime: true,
      returnTime: true,
      pickupLocation: true,
      returnLocation: true,
    };

    setTouched(allTouched);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((err) => err !== "");

    if (hasErrors) return;

    nextStep();
  };

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
      <form>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Input
                name="pickupDate"
                ref={pickupDateRef}
                onClick={() => openNativePicker(pickupDateRef)}
                label="Pickup Date"
                type="date"
                icon={<Calendar size={15} />}
                value={bookingData.pickupDate}
                onChange={handleChange}
                hasError={
                  (touched.pickupDate ? errors?.pickupDate : undefined) ||
                  errors?.pickupDate
                }
              />
              <FormError
                message={
                  (touched.pickupDate && errors?.pickupDate) || undefined
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                name="returnDate"
                ref={returnDateRef}
                onClick={() => openNativePicker(returnDateRef)}
                label="Return Date"
                type="date"
                icon={<Calendar size={15} />}
                value={bookingData.returnDate}
                onChange={handleChange}
                hasError={
                  (touched.returnDate ? errors?.returnDate : undefined) ||
                  errors?.returnDate
                }
              />
              <FormError
                message={
                  (touched.returnDate && errors?.returnDate) || undefined
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                name="pickupTime"
                ref={pickupTimeRef}
                onClick={() => openNativePicker(pickupTimeRef)}
                label="Pickup Time"
                type="time"
                icon={<Clock3 size={15} />}
                value={bookingData.pickupTime}
                onChange={handleChange}
                hasError={
                  (touched.pickupTime ? errors?.pickupTime : undefined) ||
                  errors?.pickupTime
                }
              />
              <FormError
                message={
                  (touched.pickupTime && errors?.pickupTime) || undefined
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                name="returnTime"
                ref={returnTimeRef}
                onClick={() => openNativePicker(returnTimeRef)}
                label="Return Time"
                type="time"
                icon={<Clock3 size={15} />}
                value={bookingData.returnTime}
                onChange={handleChange}
                hasError={
                  (touched.returnTime ? errors?.returnTime : undefined) ||
                  errors?.returnTime
                }
              />
              <FormError
                message={
                  (touched.returnTime && errors?.returnTime) || undefined
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base text-gray-600">Pickup Location</label>
              <select
                name="pickupLocation"
                value={bookingData.pickupLocation}
                onChange={handleChange}
                className={`w-full bg-grayDark rounded-md cursor-pointer border  p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30] ${errors.pickupLocation ? "focus:ring-red-600 border-red-600" : "focus:ring-[#FACC15] border-gray-300"}`}
              >
                <option value="" disabled>
                  Pickup Location
                </option>
                <option value="Accra - Kotoka International Airport">
                  Accra - Kotoka International Airport
                </option>
                <option value="Accra - East Legon">Accra - East Legon</option>
                <option value="Accra - Osu">Accra - Osu</option>
                <option value="Kumasi - City Center">
                  Kumasi - City Center
                </option>
                <option value="Takoradi - Harbor Area">
                  Takoradi - Harbor Area
                </option>
                <option value="Tamale - Airport">Tamale - Airport</option>
              </select>
              <FormError
                message={
                  (touched.pickupLocation && errors?.pickupLocation) ||
                  undefined
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base text-gray-600">Return Location</label>
              <select
                name="returnLocation"
                value={bookingData.returnLocation}
                onChange={handleChange}
                className={`w-full bg-grayDark rounded-md cursor-pointer border p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 ${errors.returnLocation ? "focus:ring-red-600 border-red-600" : "border-gray-300 focus:ring-[#FACC15]"}`}
              >
                <option value="" disabled>
                  Return Location
                </option>
                <option value="Accra - Kotoka International Airport">
                  Accra - Kotoka International Airport
                </option>
                <option value="Accra - East Legon">Accra - East Legon</option>
                <option value="Accra - Osu">Accra - Osu</option>
                <option value="Kumasi - City Center">
                  Kumasi - City Center
                </option>
                <option value="Takoradi - Harbor Area">
                  Takoradi - Harbor Area
                </option>
                <option value="Tamale - Airport">Tamale - Airport</option>
              </select>

              <FormError
                message={
                  (touched.returnLocation && errors?.returnLocation) ||
                  undefined
                }
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-4 border border-gray-200 bg-primary py-2 px-4 rounded-md font-bold"
            >
              Continue <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

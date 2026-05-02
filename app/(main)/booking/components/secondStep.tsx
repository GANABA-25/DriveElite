import Input from "@/components/input";
import Button from "@/components/button";
import { bookingDataTypesStageTwo } from "@/@types/auth";
import FormError from "@/components/formError";
import { validateBookingDataStageTwo } from "@/util/validation";
import { useState } from "react";
import { useBooking } from "@/store/bookingContext";

import { Mail, Phone, MapPinHouse, IdCard, User } from "lucide-react";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

type ErrorType = Partial<Record<keyof bookingDataTypesStageTwo, string>>;
type TouchedType = Partial<Record<keyof bookingDataTypesStageTwo, boolean>>;

export default function SecondStep({ nextStep, prevStep }: Props) {
  const { bookingData, updateBookingData } = useBooking();
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

    updateBookingData(updatedValues);

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateBookingDataStageTwo(updatedValues);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof bookingDataTypesStageTwo],
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateBookingDataStageTwo(bookingData);

    const allTouched: TouchedType = {
      fullName: true,
      email: true,
      phoneNumber: true,
      address: true,
      ghanaCard: true,
      driverLicense: true,
    };

    setTouched(allTouched);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((err) => err !== "");

    if (hasErrors) return;

    nextStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-2xl font-bold">Your Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Input
            name="fullName"
            label="Full Name"
            type="text"
            placeholder="John"
            icon={<User size={15} />}
            value={bookingData.fullName}
            onChange={handleChange}
            hasError={
              (touched.fullName ? errors?.fullName : undefined) ||
              errors?.fullName
            }
          />
          <FormError
            message={(touched.fullName && errors?.fullName) || undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={<Mail size={15} />}
            value={bookingData.email}
            onChange={handleChange}
            hasError={
              (touched.email ? errors?.email : undefined) || errors?.email
            }
          />
          <FormError message={(touched.email && errors?.email) || undefined} />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="+233 xx xxx xxxx"
            icon={<Phone size={15} />}
            value={bookingData.phoneNumber}
            onChange={handleChange}
            hasError={
              (touched.phoneNumber ? errors?.phoneNumber : undefined) ||
              errors?.phoneNumber
            }
          />
          <FormError
            message={(touched.phoneNumber && errors?.phoneNumber) || undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            name="address"
            label="Address"
            type="text"
            placeholder="eg Ak-320-8463"
            icon={<MapPinHouse size={15} />}
            value={bookingData.address}
            onChange={handleChange}
            hasError={
              (touched.address ? errors?.address : undefined) || errors?.address
            }
          />
          <FormError
            message={(touched.address && errors?.address) || undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            name="ghanaCard"
            label="Ghana card Number"
            type="text"
            placeholder="eg GHA-739023159-5"
            icon={<IdCard size={15} />}
            value={bookingData.ghanaCard}
            onChange={handleChange}
            hasError={
              (touched.ghanaCard ? errors?.ghanaCard : undefined) ||
              errors?.ghanaCard
            }
          />
          <FormError
            message={(touched.ghanaCard && errors?.ghanaCard) || undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            name="driverLicense"
            type="text"
            label="Driver's License Number"
            placeholder="License Number"
            icon={<IdCard size={15} />}
            value={bookingData.driverLicense}
            onChange={handleChange}
            hasError={
              (touched.driverLicense ? errors?.driverLicense : undefined) ||
              errors?.driverLicense
            }
          />
          <FormError
            message={
              (touched.driverLicense && errors?.driverLicense) || undefined
            }
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={prevStep}
          className="flex items-center gap-4 border border-gray-200 py-2 px-4 rounded-md font-bold cursor-pointer lg:hover:border-primary"
        >
          <ArrowLeft size={15} /> Back
        </Button>

        <Button
          onClick={handleSubmit}
          className="flex items-center gap-4 border border-gray-200 bg-primary py-2 px-4 rounded-md font-bold"
        >
          Continue <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}

"use client";

import {
  useState,
  useEffect,
  useMemo,
  useActionState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
import FormError from "@/components/formError";

import { createBooking } from "@/lib/bookings/createBooking";
import { bookingFormState } from "@/@types/bookingTypes";
import { bookingDataTypes } from "@/@types/bookingTypes";
import { validateBookingData } from "@/util/validation";
import { formatDate } from "@/components/formatDate";
import { computeTotalPrice } from "@/components/computeTotalPrice";

import loadingAnimation from "@/lottie/formLoadingAnimation.json";

import {
  Car,
  Check,
  Calendar,
  Clock3,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Mail, Phone, MapPinHouse, IdCard, User } from "lucide-react";

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const extrasConfig = {
  gps: { label: "GPS Navigation", price: 10 },
  childSeat: { label: "Child Seat", price: 15 },
  additionalDriver: { label: "Additional Driver", price: 20 },
  fullInsurance: { label: "Full Insurance", price: 35 },
};

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

const initialBookingData: bookingDataTypes = {
  stage: "TripDetails",
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
  fleetId: "",
  extras: {
    gps: false,
    childSeat: false,
    additionalDriver: false,
    fullInsurance: false,
  },
};

type Car = {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
};

type Extras = {
  gps: boolean;
  childSeat: boolean;
  additionalDriver: boolean;
  fullInsurance: boolean;
};

type ExtraKey = keyof Extras;

type Step = "TripDetails" | "CustomerDetails" | "ExtraDetails";
type ErrorType = Partial<Record<keyof bookingDataTypes, string>>;
type TouchedType = Partial<Record<keyof bookingDataTypes, boolean>>;

export default function BookingClient({ car }: { car: Car }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<Step>("TripDetails");
  const steps: Step[] = ["TripDetails", "CustomerDetails", "ExtraDetails"];
  const [errors, setErrors] = useState<ErrorType>({});
  const [touched, setTouched] = useState<TouchedType>({});
  const [bookingData, setBookingData] =
    useState<bookingDataTypes>(initialBookingData);
  const [formState, formAction] = useActionState<bookingFormState, FormData>(
    createBooking,
    {
      status: undefined,
      message: "",
      errors: {},
    },
  );

  const nextStep = () => {
    const validationErrors = validateBookingData(bookingData);
    setErrors(validationErrors);
    setTouched((prev) => ({
      ...prev,
      ...(step === "TripDetails" && {
        pickupDate: true,
        returnDate: true,
        pickupTime: true,
        returnTime: true,
        pickupLocation: true,
        returnLocation: true,
      }),
      ...(step === "CustomerDetails" && {
        fullName: true,
        email: true,
        phoneNumber: true,
        address: true,
        ghanaCard: true,
        driverLicense: true,
      }),
    }));

    const hasErrors = Object.values(validationErrors).some(
      (error) => error && error.trim() !== "",
    );

    if (hasErrors) {
      toast.error("Please fix the errors before proceeding.");
      return;
    }

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

  const openNativePicker = (ref: any) => {
    if (ref.current?.showPicker) {
      ref.current.showPicker();
    } else {
      ref.current?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const updatedBookingData = {
      ...bookingData,
      [name]: value,
    };

    setBookingData(updatedBookingData);

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const field = name as keyof bookingDataTypes;

    const fieldError = validateBookingData(updatedBookingData)[field];

    setErrors((prev) => ({
      ...prev,
      [field]: fieldError,
    }));
  };

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      stage: step,
    }));
  }, [step]);

  const extrasData = bookingData.extras ?? {
    gps: false,
    childSeat: false,
    additionalDriver: false,
    fullInsurance: false,
  };

  const pricing = useMemo(() => {
    return computeTotalPrice({
      bookingData,
      carPrice: car.price,
    });
  }, [bookingData, car.price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const fleetId = car._id;

    formData.append("fleetId", fleetId);

    Object.entries(bookingData).forEach(([key, value]) => {
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      toast.success(formState.message);
      router.push(`/payment/${formState.booking?.bookingId}`);
    }

    if (formState.status === "error") {
      setErrors(formState.errors || {});
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <div className="py-8 md:py-12 px-4">
      <header className="flex justify-around items-center mb-10">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary rounded-full text-sm md:text-2xl font-bold">
            {step === "TripDetails" ? 1 : <Check />}
          </div>

          <p className="text-xs md:text-base text-gray-500">Date & Location</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary rounded-full text-sm md:text-2xl font-bold">
            {step === "CustomerDetails" ? (
              2
            ) : step === "ExtraDetails" ? (
              <Check />
            ) : (
              2
            )}
          </div>
          <p className="text-xs md:text-base text-gray-500">Your Details</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary rounded-full text-sm md:text-2xl font-bold">
            {step === "ExtraDetails" ? 3 : 3}
          </div>
          <p className="text-xs md:text-base text-gray-500">Extra & Reviews</p>
        </div>
      </header>

      <section className="max-w-360 mx-auto flex flex-col lg:flex-row gap-8">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 border border-gray-200 p-4 md:p-8 rounded-md"
        >
          {step === "TripDetails" && (
            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-2xl font-bold">
                Select Date & Location
              </h1>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Input
                      name="pickupDate"
                      onClick={() => openNativePicker(bookingData.pickupDate)}
                      label="Pickup Date"
                      type="date"
                      icon={<Calendar size={15} />}
                      value={bookingData.pickupDate}
                      onChange={handleChange}
                      hasError={
                        touched.pickupDate ? errors?.pickupDate : undefined
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
                      onClick={() => openNativePicker(bookingData.returnDate)}
                      label="Return Date"
                      type="date"
                      icon={<Calendar size={15} />}
                      value={bookingData.returnDate}
                      onChange={handleChange}
                      hasError={
                        touched.returnDate ? errors?.returnDate : undefined
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
                      onClick={() => openNativePicker(bookingData.pickupTime)}
                      label="Pickup Time"
                      type="time"
                      icon={<Clock3 size={15} />}
                      value={bookingData.pickupTime}
                      onChange={handleChange}
                      hasError={
                        touched.pickupTime ? errors?.pickupTime : undefined
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
                      onClick={() => openNativePicker(bookingData.returnTime)}
                      label="Return Time"
                      type="time"
                      icon={<Clock3 size={15} />}
                      value={bookingData.returnTime}
                      onChange={handleChange}
                      hasError={
                        touched.returnTime ? errors?.returnTime : undefined
                      }
                    />
                    <FormError
                      message={
                        (touched.returnTime && errors?.returnTime) || undefined
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-base text-gray-600">
                      Pickup Location
                    </label>
                    <select
                      name="pickupLocation"
                      value={bookingData.pickupLocation}
                      onChange={handleChange}
                      className={`w-full bg-grayDark rounded-md cursor-pointer border  p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30]`}
                    >
                      <option value="" disabled>
                        Pickup Location
                      </option>
                      <option value="Accra - Kotoka International Airport">
                        Accra - Kotoka International Airport
                      </option>
                      <option value="Accra - East Legon">
                        Accra - East Legon
                      </option>
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
                    <label className="text-base text-gray-600">
                      Return Location
                    </label>
                    <select
                      name="returnLocation"
                      value={bookingData.returnLocation}
                      onChange={handleChange}
                      className={`w-full bg-grayDark rounded-md cursor-pointer border p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30`}
                    >
                      <option value="" disabled>
                        Return Location
                      </option>
                      <option value="Accra - Kotoka International Airport">
                        Accra - Kotoka International Airport
                      </option>
                      <option value="Accra - East Legon">
                        Accra - East Legon
                      </option>
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
              </div>
            </div>
          )}

          {step === "CustomerDetails" && (
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
                    hasError={touched.fullName ? errors?.fullName : undefined}
                  />
                  <FormError
                    message={
                      (touched.fullName && errors?.fullName) || undefined
                    }
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
                    hasError={touched.email ? errors?.email : undefined}
                  />
                  <FormError
                    message={(touched.email && errors?.email) || undefined}
                  />
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
                      touched.phoneNumber ? errors?.phoneNumber : undefined
                    }
                  />
                  <FormError
                    message={
                      (touched.phoneNumber && errors?.phoneNumber) || undefined
                    }
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
                    hasError={touched.address ? errors?.address : undefined}
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
                    hasError={touched.ghanaCard ? errors?.ghanaCard : undefined}
                  />
                  <FormError
                    message={
                      (touched.ghanaCard && errors?.ghanaCard) || undefined
                    }
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
                      touched.driverLicense ? errors?.driverLicense : undefined
                    }
                  />
                  <FormError
                    message={
                      (touched.driverLicense && errors?.driverLicense) ||
                      undefined
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === "ExtraDetails" && (
            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-2xl font-bold">Extras & Review</h1>

              <div className="flex flex-col gap-4">
                {extras.map((extra) => (
                  <div
                    key={extra.key}
                    role="checkbox"
                    aria-checked={extrasData[extra.key]}
                    tabIndex={0}
                    className={`md:w-165 lg:w-225 flex justify-between items-center border p-4 rounded-md cursor-pointer transition-all ${
                      extrasData[extra.key]
                        ? "border-primary bg-primary/20"
                        : "border-gray-200 hover:border-primary"
                    }`}
                    onClick={() => {
                      setBookingData((prev) => {
                        const currentExtras = prev.extras ?? {
                          gps: false,
                          childSeat: false,
                          additionalDriver: false,
                          fullInsurance: false,
                        };

                        return {
                          ...prev,
                          extras: {
                            ...currentExtras,
                            [extra.key]: !currentExtras[extra.key],
                          },
                        };
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();

                        setBookingData((prev) => {
                          const currentExtras = prev.extras ?? {
                            gps: false,
                            childSeat: false,
                            additionalDriver: false,
                            fullInsurance: false,
                          };

                          return {
                            ...prev,
                            extras: {
                              ...currentExtras,
                              [extra.key]: !currentExtras[extra.key],
                            },
                          };
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          extrasData[extra.key]
                            ? "bg-yellow-400 border-yellow-400"
                            : "border-gray-400"
                        }`}
                      >
                        {extrasData[extra.key] && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>

                      <div>
                        <h1 className="text-sm md:text-base">{extra.label}</h1>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {extra.desc}
                        </p>
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
                      {formatDate(bookingData?.pickupDate)} at{" "}
                      {bookingData?.pickupTime}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-gray-500">Return</h1>
                    <p className="font-medium">
                      {formatDate(bookingData?.returnDate)} at{" "}
                      {bookingData?.returnTime}
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
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-4 border border-gray-200 py-2 px-4 rounded-md font-bold cursor-pointer lg:hover:border-primary"
            >
              <ArrowLeft size={15} /> Back
            </Button>
            {step === "ExtraDetails" ? (
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-base text-center font-bold transition-transform duration-200 ease-in-out lg:hover:cursor-pointer bg-primary text-black hover:bg-yellow-500 hover:scale-105"
              >
                {isPending ? (
                  <div className="flex justify-center ">
                    <Lottie
                      className="w-18 lg:w-18"
                      animationData={loadingAnimation}
                      loop={true}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    Complete Booking
                    <ArrowRight size={15} />
                  </div>
                )}
              </button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-4 border border-gray-200 transition-transform duration-200 ease-in-out lg:hover:cursor-pointer bg-primary py-2 px-4 rounded-md font-bold hover:bg-yellow-500 hover:scale-105"
              >
                Continue <ArrowRight size={15} />
              </Button>
            )}
          </div>
        </form>

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
              <h1 className="text-black text-sm">{pricing.days} day(s)</h1>
            </div>

            {Object.entries(bookingData.extras ?? {}).map(([key, value]) => {
              if (!value) return null;

              const extra = extrasConfig[key as keyof typeof extrasConfig];

              if (!extra) return null;

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
              ${formatPrice(pricing.totalPrice)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

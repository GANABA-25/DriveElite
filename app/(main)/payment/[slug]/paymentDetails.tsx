"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Smartphone,
  CreditCard,
  Check,
  Phone,
  Info,
  Lock,
  Shield,
  Pen,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { processPayment } from "@/lib/payments/processPayment";
import { useActionState } from "react";

import CompletedPayment from "../completedPayment";
import Input from "@/components/input";
import Lottie from "lottie-react";
import { formatDate } from "@/components/formatDate";

import loadingAnimation from "../../../../lottie/formLoadingAnimation.json";

import { fleetFiltersDataTypes } from "@/@types/fleet.types";
import { FormState } from "@/@types/auth";

type Props = {
  fleet: fleetFiltersDataTypes;
  booking: {
    fleetId: string;
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;
    totalDays: number;
    dailyRate: number;
    totalPrice: number;
    bookingReference: string;
  };
};

const providers = [
  { key: "MTN", label: "MTN Mobile Money", desc: "024, 054, 055, 059" },
  { key: "Telecel", label: "Telecel Cash", desc: "020, 050" },
  { key: "AirtelTigo", label: "AirtelTigo", desc: "026, 027, 056, 057" },
];

type paymentProviderTypes = (typeof providers)[number]["key"];

const paymentIsCompleted = false;

interface paymentDataTypes {
  paymentDetails: {
    paymentOption: string;
    mobileMoney: {
      provider: string;
      accountNumber: string;
      accountName: string;
    };
    card: {
      cardNumber: string;
      cardName: string;
      cardExpiryDate: string;
      cardCvv: string;
    };
  };
}

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function PaymentDetails({ fleet, booking }: Props) {
  const [paymentMethod, setPaymentMethod] = useState("mobileMoney");
  const [selectedProvider, setSelectedProvider] =
    useState<paymentProviderTypes | null>(null);
  const [formState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(processPayment, {
    status: undefined,
    message: "",
    errors: {},
  });

  const [paymentData, setPaymentData] = useState<paymentDataTypes>({
    paymentDetails: {
      paymentOption: "",
      mobileMoney: {
        provider: "",
        accountNumber: "",
        accountName: "",
      },
      card: {
        cardNumber: "",
        cardName: "",
        cardExpiryDate: "",
        cardCvv: "",
      },
    },
  });

  if (!fleet) return <p>Car not found</p>;

  const handleChange = (
    section: "mobileMoney" | "card",
    field: string,
    value: string,
  ) => {
    const updated = {
      ...paymentData,
      paymentDetails: {
        ...paymentData.paymentDetails,
        [section]: {
          ...paymentData.paymentDetails[section],
          [field]: value,
        },
      },
    };

    setPaymentData(updated);

    // const validationErrors = validatePaymentData(updated);

    // setErrors(validationErrors);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-center md:items-center items-start lg:items-start gap-8 px-4 lg:px-0">
        <div className="flex flex-col gap-8">
          <Link
            href={`/booking/${fleet._id}`}
            className="w-40 flex items-center gap-2 mt-8 cursor-pointer lg:hover:bg-gray-100 p-2 rounded-md shadow-xs"
          >
            <ArrowLeft size={15} />
            <h1 className="text-sm">Back to Booking</h1>
          </Link>

          <div className="flex flex-col gap-4 border border-gray-100 shadow rounded-md p-8">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <p className="text-gray-500 text-sm">Select Payment Method</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div
                onClick={() => setPaymentMethod("mobileMoney")}
                className={`flex items-center cursor-pointer gap-2 p-4 rounded-md shadow-sm ${paymentMethod === "mobileMoney" ? "border-primary  border-2 bg-[#fef9e7]" : "border border-gray-300"}`}
              >
                <div
                  className={`p-2 rounded-md ${paymentMethod === "mobileMoney" ? "text-primary bg-[#fdf0bd]" : "bg-gray-200"}`}
                >
                  <Smartphone />
                </div>
                <div>
                  <h1 className="text-base font-bold">Mobile Money</h1>
                  <p className="text-xs text-gray-500">
                    MTN, Vodafone, AirtelTigo
                  </p>
                </div>
              </div>
              <div
                onClick={() => setPaymentMethod("creditCard")}
                className={`flex items-center cursor-pointer gap-2  p-4 rounded-md shadow-sm ${paymentMethod === "creditCard" ? "  border-2 border-primary bg-[#fef9e7]" : "border border-gray-300"}`}
              >
                <div
                  className={`p-2 rounded-md ${paymentMethod === "creditCard" ? "text-primary bg-[#fdf0bd]" : "bg-gray-200"}`}
                >
                  <CreditCard />
                </div>
                <div>
                  <h1 className="text-base font-bold">Credit/Debit Card</h1>
                  <p className="text-xs text-gray-500">Visa, Mastercard</p>
                </div>
              </div>
            </div>

            {paymentMethod === "mobileMoney" && (
              <div>
                <form action={formAction} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <h1>Select Provider</h1>

                    {providers.map((provider) => (
                      <div
                        key={provider.key}
                        role="radio"
                        aria-checked={selectedProvider === provider.key}
                        tabIndex={0}
                        className={`flex justify-between items-center border p-4 rounded-md cursor-pointer transition-all ${
                          selectedProvider === provider.key
                            ? "border-primary bg-primary/20"
                            : "border-gray-200 hover:border-primary"
                        }`}
                        onClick={() => {
                          setSelectedProvider(provider.key);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedProvider(provider.key);
                          }
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedProvider === provider.key
                                ? "bg-yellow-400 border-yellow-400"
                                : "border-gray-400"
                            }`}
                          >
                            {selectedProvider === provider.key && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>

                          <div>
                            <h1 className="text-sm md:text-base">
                              {provider.label}
                            </h1>
                            <p className="text-gray-500 text-xs">
                              {provider.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    name="provider"
                    value={selectedProvider || ""}
                  />
                  <input type="hidden" name="bookingData" />
                  <div className="flex flex-col gap-2">
                    <Input
                      name="accountNumber"
                      label="Mobile Money Number"
                      type="tel"
                      placeholder="eg. 0xx xxx xxxx"
                      icon={<Phone size={15} />}
                      value={
                        paymentData.paymentDetails.mobileMoney.accountNumber
                      }
                      onChange={(e) =>
                        handleChange(
                          "mobileMoney",
                          "accountNumber",
                          e.target.value,
                        )
                      }
                    />
                    {/* <FormError message={errors.accountNumber} /> */}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Input
                      name="accountName"
                      label="Account Name"
                      type="tel"
                      placeholder="Name on mobile money account"
                      icon={<Phone size={15} />}
                      value={paymentData.paymentDetails.mobileMoney.accountName}
                      onChange={(e) =>
                        handleChange(
                          "mobileMoney",
                          "accountName",
                          e.target.value,
                        )
                      }
                    />
                    {/* <FormError message={errors.accountName} /> */}
                  </div>

                  <div className="bg-[#fef9e7] flex flex-col gap-1 p-4">
                    <div className="flex items-center gap-2">
                      <Info size={15} className="text-primary" />
                      <h1 className="text-sm font-bold">How it works</h1>
                    </div>
                    <p className="text-xs text-gray-500">
                      After clicking "Pay Now", you'll receive a prompt on your
                      phone to authorize <br /> the payment. Please ensure your
                      phone is nearby and has sufficient <br /> balance.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Lock size={15} />

                    <p className="text-red-600 text-sm font-bold">
                      Note this is strictly a demo. No actual payment will be
                      processed.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={`p-2 bg-primary text-accent font-bold lg:hover:bg-primary/80 rounded-md shadow-xs cursor-not-allowed`}
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
                        <Shield size={15} />
                        Pay ${formatPrice(booking?.totalPrice)} Now
                      </div>
                    )}
                  </button>
                </form>
              </div>
            )}

            {paymentMethod === "creditCard" && (
              <form className="flex flex-col gap-4">
                <Input
                  name="cardNumber"
                  type="tel"
                  icon={<CreditCard size={15} />}
                  label="Card Number"
                  placeholder="1234 5678 9012 3454"
                />

                <Input
                  name="cardName"
                  type="tel"
                  icon={<Pen size={15} />}
                  label="Name on Card"
                  placeholder="John Doe"
                />

                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Input
                    name="cardExpiryDate"
                    type="date"
                    icon={<Calendar size={15} />}
                    label="Expiry Date"
                    placeholder="John Doe"
                  />

                  <Input
                    name="cardCvv"
                    type="tel"
                    icon={<Pen size={15} />}
                    label="CVV"
                    placeholder="123"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Lock size={15} />
                  <p className="text-gray-500 text-sm">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                <button
                  type="submit"
                  className={`p-2 bg-primary text-accent font-bold lg:hover:bg-primary/80 rounded-md shadow-xs cursor-pointer`}
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
                      <Shield size={15} />
                      Pay $ {formatPrice(booking?.totalPrice)} Now
                    </div>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="sticky lg:top-45 h-fit w-full lg:w-110 border border-gray-200 p-6 rounded-md flex flex-col gap-4">
          <div className="relative h-40 md:h-85 lg:h-50 w-full rounded-md overflow-hidden">
            <Image
              src={fleet.imageUrl}
              alt={fleet.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold">{fleet.name}</h1>
            <p className="text-gray-500 text-sm">{fleet.category}</p>
          </div>

          <div className="text-base text-gray-500 flex flex-col gap-2">
            <div className="text-sm flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p>Pickup</p>
                <h1 className="text-sm text-black font-medium">
                  {formatDate(booking?.pickupDate)} at {booking?.pickupTime}
                </h1>
              </div>

              <div className="flex justify-between items-center">
                <p>Return</p>
                <h1 className="text-sm text-black font-medium">
                  {formatDate(booking?.returnDate)} at
                  {booking?.returnTime}
                </h1>
              </div>

              <div className="flex justify-between items-center">
                <p>Duration</p>
                <h1 className="text-sm text-black font-medium">
                  {booking?.totalDays} day(s)
                </h1>
              </div>

              <div className="flex justify-between items-center">
                <p>Daily Rate</p>
                <h1 className="text-sm text-black font-medium">
                  ${formatPrice(booking?.dailyRate)}
                </h1>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 py-2 flex justify-between items-center">
            <h1 className=" font-bold">Total</h1>
            <p className="text-primary text-lg md:text-2xl font-bold">
              ${formatPrice(booking?.totalPrice)}
            </p>
          </div>
        </div>
      </section>

      {paymentIsCompleted && (
        <section>
          <CompletedPayment />
        </section>
      )}
    </>
  );
}

"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { computeTotalPrice } from "@/components/computeTotalPrice";
import { bookingDataTypes } from "@/@types/bookingTypes";

interface BookingContextType {
  bookingData: bookingDataTypes;
  days: number;
  totalPrice: number;
  formattedPrice: string;
  setCarPrice: (price: number) => void;
  updateField: <K extends keyof bookingDataTypes>(
    field: K,
    value: bookingDataTypes[K],
  ) => void;
  updateExtras: (
    extra: keyof bookingDataTypes["extras"],
    value: boolean,
  ) => void;
  resetBooking: () => void;
}

const initialBookingData: bookingDataTypes = {
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

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bookingData, setBookingData] =
    useState<bookingDataTypes>(initialBookingData);

  const [carPrice, setCarPrice] = useState<number>(0);

  const pricing = useMemo(() => {
    return computeTotalPrice({
      bookingData,
      carPrice,
    });
  }, [bookingData, carPrice]);

  const updateField = <K extends keyof bookingDataTypes>(
    field: K,
    value: bookingDataTypes[K],
  ) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateExtras = (
    extra: keyof bookingDataTypes["extras"],
    value: boolean,
  ) => {
    setBookingData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extra]: value,
      },
    }));
  };

  const resetBooking = () => {
    setBookingData(initialBookingData);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        days: pricing.days,
        totalPrice: pricing.totalPrice,
        formattedPrice: formatPrice(pricing.totalPrice),
        setCarPrice,
        updateField,
        updateExtras,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingContextProvider");
  }

  return context;
};

export default BookingContextProvider;

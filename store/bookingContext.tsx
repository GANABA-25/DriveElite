"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { bookingDataTypes } from "@/@types/auth";
import { computeTotalPrice } from "@/components/computeTotalPrice";

interface BookingContextType {
  bookingData: bookingDataTypes;
  days: number;
  totalPrice: number;
  formattedPrice: string;
  updateBookingData: (data: Partial<bookingDataTypes>) => void;
  setCarPrice: (price: number) => void;
  clearBookingData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [carPrice, setCarPriceState] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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
    fleetId: "",
    extras: {
      gps: false,
      childSeat: false,
      additionalDriver: false,
      fullInsurance: false,
    },
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

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    if (!carPrice) return;

    const result = computeTotalPrice({
      bookingData,
      carPrice,
    });

    setDays(result.days);
    setTotalPrice(result.totalPrice);
  }, [bookingData, carPrice]);

  const updateBookingData = (data: Partial<bookingDataTypes>) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const setCarPrice = (price: number) => {
    setCarPriceState(price);
  };

  const clearBookingData = () => {
    // setBookingData(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        days,
        totalPrice,
        formattedPrice: formatPrice(totalPrice),
        updateBookingData,
        setCarPrice,
        clearBookingData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingContextProvider");
  }

  return context;
};

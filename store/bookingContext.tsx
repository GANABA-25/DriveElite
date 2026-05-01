"use client";

import { createContext, useState, ReactNode } from "react";

import { bookingDataTypes } from "@/@types/auth";

interface AuthContextType {
  bookingData: bookingDataTypes | null;
  bookCar: (bookingData: bookingDataTypes) => void;
}

export const BookingContext = createContext<AuthContextType | null>(null);

const BookingContextProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<bookingDataTypes | null>(null);

  const bookCar = (bookingData: bookingDataTypes) => {};

  const value = {
    bookingData: bookingData,
    bookCar,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingContextProvider;

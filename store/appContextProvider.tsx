import AuthContextProvider from "./authContext";
import BookingContextProvider from "./bookingContext";
import { ReactNode } from "react";

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <BookingContextProvider>{children} </BookingContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;

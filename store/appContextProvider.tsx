import AuthContextProvider from "./authContext";
import { ReactNode } from "react";

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AppContextProvider;

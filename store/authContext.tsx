"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface AuthContextType {
  userData: UserData | null;
  isAuthenticated: boolean;
  role: string | null;
  authenticate: (userData: UserData) => void;
  logout: () => void;
}

import { logoutAction } from "@/lib/profile/logOut";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) setAuthData(JSON.parse(storedUser));
  }, []);

  const authenticate = (userData: UserData) => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    setAuthData(userData);
  };

  const logout = async () => {
    await logoutAction();
    sessionStorage.removeItem("userData");
    setAuthData(null);
  };

  const value = {
    userData: authData,
    isAuthenticated: !!authData,
    role: authData?.role || null,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside provider");
  return context;
};

export default AuthContextProvider;

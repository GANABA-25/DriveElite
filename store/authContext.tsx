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
  phoneNumber: number;
  role: string;
  token: string;
}

interface AuthContextType {
  userData: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  authenticate: (userData: UserData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser) setAuthData(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken as string);
  }, []);

  const authenticate = (userData: UserData) => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("token", userData.token);

    setAuthData(userData);
    setToken(userData.token);
  };

  const logout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");

    setAuthData(null);
    setToken(null);
  };

  const value = {
    userData: authData,
    token,
    isAuthenticated: !!token,
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

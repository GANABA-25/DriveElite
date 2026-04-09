"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Car, Shield, Star, Zap } from "lucide-react";

import Link from "next/link";
import Input from "@/components/input";
import FormError from "../../../components/formError";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import FeatureItem from "../../../components/featureItem";
import { signInUser } from "@/lib/profile/signInUser";

import loadingAnimation from "@/lottie/formLoadingAnimation.json";
import { Mail, Phone } from "lucide-react";

import { SignInDataTypes } from "@/types/auth";
import { SignInFormState } from "@/types/auth";

interface ErrorMsgType {
  email?: string;
  phoneNumber?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<ErrorMsgType>({});
  const [authMethod, setAuthMethod] = useState("email");
  const [formData, setFormData] = useState<SignInDataTypes>({
    phoneNumber: "",
    email: "",
    authMethod: "",
  });

  const [formState, formAction, isPending] = useActionState<
    SignInFormState,
    FormData
  >(signInUser, {
    status: undefined,
    message: "",
    errors: {},
  });

  const selectHandler = (value: string) => {
    setAuthMethod(value);
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      toast.success(formState.message);

      const email = formState.data?.email;
      const phoneNumber = formState.data?.phoneNumber;
      const type = "signin";

      router.push(
        `/authentication/signin/verifyOtp?email=${encodeURIComponent(email || "")}&phone=${encodeURIComponent(phoneNumber || "")}&type=${encodeURIComponent(type || "")}`,
      );
    }

    if (formState.status === "error") {
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen px-4 lg:px-0">
      <section className="hidden lg:flex justify-center items-start pl-10 flex-col gap-8 bg-linear-to-br from-[#191d27] to-[#2b2924]">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-md">
            <Car />
          </div>
          <div className="text-white font-black text-base">DriveElite</div>
        </div>

        <h1 className="text-5xl text-white font-black">
          Your Premium <br /> <span className="text-primary">Driving</span>{" "}
          Experience
        </h1>
        <p className="text-base text-white/40">
          Discover exclusive vehicles and unlock premium <br /> features with
          your DriveElite account.
        </p>

        <div className="flex flex-col gap-8">
          <FeatureItem
            icon={<Shield className="w-4 h-4" />}
            title="Secure & Verified"
            description="Your data is encrypted and protected"
          />
          <FeatureItem
            icon={<Star className="w-4 h-4" />}
            title="Exclusive Access"
            description="Premium vehicles and special offers"
          />
          <FeatureItem
            icon={<Zap className="w-4 h-4" />}
            title="Instant Booking"
            description="Reserve your ride in seconds"
          />
        </div>

        <p className="text-white/40 text-sm">
          © 2026 DriveElite. All rights reserved.
        </p>
      </section>

      <section className="flex justify-center items-center relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="absolute w-125 h-125 rounded-full border-2 border-dashed border-primary/20 animate-[spin_25s_linear_infinite]" />
        </div>
        <form
          action={formAction}
          className="relative z-10 backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-10 flex flex-col gap-4"
        >
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-black text-2xl">Welcome Back</h1>
            <h1 className="text-base text-gray-500">
              Sign in to access your bookings
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 p-1">
            <div
              onClick={() => selectHandler("email")}
              className={`flex items-center gap-2 px-18 py-2 cursor-pointer ${
                authMethod === "email"
                  ? "text-primary bg-accent rounded-md shadow-sm lg:hover:bg-accent/90"
                  : "text-gray-500 border border-gray-200 rounded-md lg:hover:bg-gray-100 lg:hover:border lg:hover:border-primary"
              }`}
            >
              <Mail size={16} />
              <span>Email</span>
            </div>

            <div
              onClick={() => selectHandler("phone")}
              className={`flex items-center gap-2 px-18 py-2 cursor-pointer ${
                authMethod === "phone"
                  ? "text-primary bg-accent rounded-md shadow-sm lg:hover:bg-accent/90"
                  : "text-gray-500 border border-gray-200 rounded-md lg:hover:bg-gray-100 lg:hover:border lg:hover:border-primary"
              }`}
            >
              <Phone size={16} />
              <span>Phone</span>
            </div>
          </div>
          <input type="hidden" name="authMethod" value={authMethod} />

          <div className="flex flex-col gap-2">
            <Input
              type={authMethod === "email" ? "email" : "tel"}
              name={authMethod === "email" ? "email" : "phoneNumber"}
              value={
                authMethod === "email"
                  ? formData.email || ""
                  : formData.phoneNumber || ""
              }
              hasError={
                authMethod === "email" ? errorMsg.email : errorMsg.phoneNumber
              }
              icon={
                authMethod === "email" ? (
                  <Mail size={15} />
                ) : (
                  <Phone size={15} />
                )
              }
              placeholder={
                authMethod === "email"
                  ? "Email Address"
                  : "Phone Number (eg, +233596498006)"
              }
              onChange={(e) => {
                const fieldName =
                  authMethod === "email" ? "email" : "phoneNumber";

                setFormData((prev) => ({
                  ...prev,
                  [fieldName]: e.target.value,
                }));

                setErrorMsg((prev) => ({
                  ...prev,
                  [fieldName]: null,
                }));
              }}
            />
            <FormError
              message={
                authMethod === "email" ? errorMsg.email : errorMsg.phoneNumber
              }
            />
          </div>

          <h1 className="text-xs border border-primary shadow-xs text-accent text-center bg-gray-50 p-2 rounded-md">
            {authMethod === "email" && (
              <>A verification code will be sent to your email address</>
            )}

            {authMethod === "phone" && (
              <> An sms with a verification code will be sent to your phone.</>
            )}
          </h1>

          <button className="p-2 bg-primary text-accent font-bold rounded-md shadow-xs cursor-pointer">
            {isPending ? (
              <div className="flex justify-center">
                <Lottie
                  className="w-18 lg:w-18"
                  animationData={loadingAnimation}
                  loop={true}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                Send OTP
              </div>
            )}
          </button>

          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="p-2 text-xs text-center cursor-pointer">
              Don't have an account?
            </p>
            <Link
              href="/authentication/signup"
              className="text-primary text-base"
            >
              Create One
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

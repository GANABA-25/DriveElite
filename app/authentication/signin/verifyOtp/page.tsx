"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Input from "@/components/input";
import { Binary } from "lucide-react";
import Lottie from "lottie-react";
import { FormState } from "@/@types/auth";
import { VerifyOtp } from "@/lib/profile/verifyOtp";

import { Mail } from "lucide-react";
import loadingAnimation from "@/lottie/formLoadingAnimation.json";

export default function verifyAccount() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const [formState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(VerifyOtp, {
    status: undefined,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      toast.success(formState.message);
      router.push("/");
    }

    if (formState.status === "error") {
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="absolute inset-0 z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
      </div>

      <form
        action={formAction}
        className="relative z-10 w-100 backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-8 flex flex-col gap-4"
      >
        <div className="flex justify-center items-center">
          <div className="bg-primary/20 p-6 rounded-full">
            <Mail size={40} className="text-primary" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">
            Enter Verification Code
          </h1>
          <p className="text-sm text-gray-500 text-center">
            A one-time verification code has been sent <br /> to your phone
            number. Please enter the code <br /> below to continue.
          </p>
        </div>
        <input type="hidden" name="email" value={email || ""} />
        <input type="hidden" name="phoneNumber" value={phone || ""} />
        <Input
          value={otp}
          type="tel"
          name="Otp"
          onChange={(e) => setOtp(e.target.value)}
          icon={<Binary size={15} />}
          placeholder="Enter OTP"
        />

        <button
          type="submit"
          className="p-2 bg-primary text-accent font-bold rounded-md shadow-xs cursor-pointer"
        >
          {isPending ? (
            <div className="flex justify-center">
              <Lottie
                className="w-18 lg:w-18"
                animationData={loadingAnimation}
                loop={true}
              />
            </div>
          ) : (
            "Verify & Continue"
          )}
        </button>
        <p className="text-gray-500 text-center">
          Didn't receive the code? <span className="text-primary">Resend</span>
        </p>
      </form>
    </div>
  );
}

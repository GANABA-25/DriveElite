"use client";

import Link from "next/link";
import { useActionState, useRef, useEffect } from "react";
import { verifyEmail } from "@/lib/profile/verifyEmail";
import Lottie from "lottie-react";
import { CheckCircle, Car, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import loadingAnimation from "../../../lottie/loadingAnimation.json";

type FormState = {
  status?: "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

export default function VerifyEmail() {
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  const [formState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(verifyEmail, {
    status: undefined,
    message: "",
    errors: {},
  });

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // ❗ Handle missing params early
  if (!token || !email) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-semibold">
          Invalid or missing verification link
        </p>
      </div>
    );
  }

  // ✅ Auto-submit when form is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 0);

    return () => clearTimeout(timer);
  }, [token, email]);

  // ✅ Toast notifications
  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      toast.success(formState.message);
    }

    if (formState.status === "error") {
      toast.error(formState.message);
    }
  }, [formState]);

  const isIdle = !isPending && !formState.status;

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden px-4">
      {isIdle && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-9 w-9 text-accent" />
          </div>

          <h1 className="text-2xl font-black">Preparing verification...</h1>

          <p className="text-gray-500">Setting things up, please wait.</p>
        </div>
      )}

      {isPending && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-9 w-9 text-accent" />
          </div>

          <h1 className="text-2xl font-black">Verifying your email...</h1>

          <p className="text-gray-500">
            Please wait while we verify your account.
          </p>

          <Lottie className="w-24" animationData={loadingAnimation} loop />
        </div>
      )}

      {formState.status === "error" && (
        <div className="flex flex-col items-center gap-6 border border-red-200 p-8 rounded-md shadow-md text-center max-w-md w-full">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10">
            <Mail className="h-10 w-10 text-red-500" />
          </div>

          <h1 className="text-2xl font-black text-red-600">
            Verification Failed
          </h1>

          <p className="text-sm text-gray-500">
            {formState.message ||
              "The verification link is invalid or expired."}
          </p>

          <Link
            href="/signin"
            className="inline-block bg-primary px-6 py-4 rounded-md font-black transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl"
          >
            Back to Sign In
          </Link>
        </div>
      )}

      {formState.status === "success" && (
        <div className="flex flex-col items-center gap-8 border border-gray-200 p-8 rounded-md shadow-md text-center max-w-md w-full">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500/10">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Car className="h-4 w-4 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-black">You're all set!</h1>

          <p className="text-sm text-gray-500">
            {formState.message || "Your email has been verified successfully."}
          </p>

          <Link
            href="/"
            className="inline-block bg-primary px-6 py-4 rounded-md font-black transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl"
          >
            Start browsing cars
          </Link>
        </div>
      )}

      <form ref={formRef} action={formAction}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
      </form>
    </div>
  );
}

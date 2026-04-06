"use client";

import Link from "next/link";
import Input from "@/components/input";
import { useActionState, useState, useEffect } from "react";
import { createUser } from "@/lib/profile/createUser";
import Lottie from "lottie-react";
import { toast } from "react-toastify";

import { Mail, Phone, Lock, User, Car, Shield, Star, Zap } from "lucide-react";

import { validateSignUpData } from "../../../util/validation";
import FormError from "../../../components/formError";
// import loadingAnimation from "@/lottie/formLoadingAnimation.json";
import loadingAnimation from "../../../lottie/formLoadingAnimation.json";
import FeatureItem from "@/components/featureItem";

import { FormDataTypes } from "@/types/auth";
import { FormState } from "@/types/auth";

type ErrorType = Partial<Record<keyof FormDataTypes, string>>;
type TouchedType = Partial<Record<keyof FormDataTypes, boolean>>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [touched, setTouched] = useState<TouchedType>({});
  const [formState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(createUser, {
    status: undefined,
    message: "",
    errors: {},
  });

  const [signUpData, setSignUpData] = useState<FormDataTypes>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...signUpData,
      [name]: value,
    };

    setSignUpData(updatedValues);

    if (value.trim() === "") {
      setTouched((prev) => ({
        ...prev,
        [name]: false,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      return;
    }

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateSignUpData(updatedValues);

    setErrors(validationErrors);
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      toast.success(formState.message);
    }

    if (formState.status === "error") {
      setErrors(formState.errors || {});
      toast.error(formState.message);
    }
  }, [formState]);

  const disableButton =
    Object.values(signUpData).some((value) => !value) ||
    Object.values(errors).some((error) => error);

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

      <section className="flex justify-center items-center relative overflow-hidden py-12 bg-gray-50">
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="absolute w-160 h-160 rounded-full border-2 border-dashed border-primary/20 animate-[spin_25s_linear_infinite]" />
        </div>
        <form
          action={formAction}
          className="relative z-10 backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-8 flex flex-col gap-4"
        >
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-black text-2xl">Create Account</h1>
            <h1 className="text-base text-gray-500">
              Join DriveElite for exclusive offers
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col gap-2">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                icon={<User size={15} />}
                placeholder="John"
                value={signUpData.firstName}
                onChange={handleChange}
                hasError={
                  (touched.firstName ? errors?.firstName : undefined) ||
                  errors?.firstName
                }
              />
              <FormError
                message={(touched.firstName && errors?.firstName) || undefined}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                icon={<User size={15} />}
                placeholder="Doe"
                value={signUpData.lastName}
                onChange={handleChange}
                hasError={
                  (touched.lastName ? errors?.lastName : undefined) ||
                  errors?.lastName
                }
              />
              <FormError
                message={(touched.lastName && errors?.lastName) || undefined}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Email Address"
              type="email"
              name="email"
              icon={<Mail size={15} />}
              placeholder="you@gmail.com"
              value={signUpData.email}
              onChange={handleChange}
              hasError={
                (touched.email ? errors?.email : undefined) || errors?.email
              }
            />
            <FormError
              message={(touched.email && errors?.email) || undefined}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              icon={<Phone size={15} />}
              placeholder="+233 XX XXX XXXX"
              value={signUpData.phoneNumber}
              onChange={handleChange}
              hasError={
                (touched.phoneNumber ? errors?.phoneNumber : undefined) ||
                errors?.phoneNumber
              }
            />
            <FormError
              message={
                (touched.phoneNumber && errors?.phoneNumber) || undefined
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="Password"
              type="password"
              name="password"
              icon={<Lock size={15} />}
              placeholder="Password"
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
              value={signUpData.password}
              onChange={handleChange}
              hasError={
                (touched.password ? errors?.password : undefined) ||
                errors?.password
              }
            />
            <FormError
              message={(touched.password && errors?.password) || undefined}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              icon={<Lock size={15} />}
              placeholder="Confirm Password"
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
              value={signUpData.confirmPassword}
              onChange={handleChange}
              hasError={
                (touched.confirmPassword
                  ? errors?.confirmPassword
                  : undefined) || errors?.confirmPassword
              }
            />
            <FormError
              message={
                (touched.confirmPassword && errors?.confirmPassword) ||
                undefined
              }
            />
          </div>

          <button
            type="submit"
            disabled={disableButton || isPending}
            className={`p-2 bg-primary text-accent font-bold lg:hover:bg-primary/80 rounded-md shadow-xs ${
              disableButton || isPending
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            }`}
          >
            {isPending ? (
              <div className="flex justify-center ">
                <Lottie
                  className="w-18 lg:w-18"
                  animationData={loadingAnimation}
                  loop={true}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                create Account
              </div>
            )}
          </button>

          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="p-2 text-xs text-center cursor-pointer">
              Already have an account?
            </p>
            <Link
              href="/authentication/signin"
              className="text-primary text-sm"
            >
              Sign in here
            </Link>
          </div>

          <p className="text-xs text-center">
            By creating an account, you agree to our
            <span className="text-primary"> Terms of Service</span> and
            <span className="text-primary">
              {" "}
              Privacy <br />
              Policy
            </span>
          </p>
        </form>
      </section>
    </div>
  );
}

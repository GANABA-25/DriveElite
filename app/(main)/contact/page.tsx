"use client";
import loadingAnimation from "../../../lottie/formLoadingAnimation.json";
import Lottie from "lottie-react";

import { BookOpenCheck, Mail, Phone } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { contactUs } from "@/lib/contact/contactUs";
import { toast } from "react-toastify";

import { validateContactMessageData } from "@/util/validation";
import ContactCard from "./contact-card";
import Input from "@/components/input";
import { contactFormSate, contactUsDataTypes } from "@/@types/auth";
import FormError from "@/components/formError";

type ErrorType = Partial<Record<keyof contactUsDataTypes, string>>;
type TouchedType = Partial<Record<keyof contactUsDataTypes, boolean>>;

export default function ContactPage() {
  const [touched, setTouched] = useState<TouchedType>({});
  const [errors, setErrors] = useState<ErrorType>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, formAction, isPending] = useActionState<
    contactFormSate,
    FormData
  >(contactUs, {
    status: undefined,
    message: "",
    errors: {},
  });

  const [contactMessageData, setContactMessageData] =
    useState<contactUsDataTypes>({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...contactMessageData,
      [name]: value,
    };

    setContactMessageData(updatedValues);

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

    const validationErrors = validateContactMessageData(updatedValues);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof contactUsDataTypes],
    }));
  };

  useEffect(() => {
    if (!formState?.message) return;

    if (formState.status === "success") {
      setContactMessageData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
      toast.success(formState.message);
    }

    if (formState.status === "error") {
      setErrors(formState.errors || {});
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <>
      <header className="flex flex-col gap-4 text-center py-20 px-4 lg:px-0">
        <p className="uppercase text-gray-500">Contact Us</p>
        <h1 className="text-4xl md:text-5xl font-black">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-gray-500 text-base">
          Have questions or need assistance? We're here to help. Reach out to us
          through any of the <br /> channels below.
        </p>
      </header>

      <section className="max-w-360 mx-auto px-4 lg:px-0">
        <ContactCard />
      </section>

      <section className="max-w-360 mx-auto flex flex-col gap-8 pt-20 px-4 lg:px-0">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black">
            Send Us a <span className="text-primary">Message</span>
          </h1>
          <p className="text-gray-500 text-base">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <form
          action={(formData) => {
            setIsSubmitted(true);
            return formAction(formData);
          }}
          className="flex justify-center items-center gap-4"
        >
          <div className="w-200 p-8 flex flex-col gap-4 border border-gray-200 rounded-md shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  icon={<BookOpenCheck size={15} />}
                  type="text"
                  name="firstName"
                  placeholder="John"
                  label="First Name"
                  value={contactMessageData.firstName}
                  onChange={handleChange}
                  hasError={
                    ((touched.firstName || isSubmitted) && errors?.firstName) ||
                    undefined
                  }
                />
                <FormError
                  message={
                    ((touched.firstName || isSubmitted) && errors?.firstName) ||
                    undefined
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  icon={<BookOpenCheck size={15} />}
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  label="Last Name"
                  value={contactMessageData.lastName}
                  onChange={handleChange}
                  hasError={
                    ((touched.lastName || isSubmitted) && errors?.lastName) ||
                    undefined
                  }
                />
                <FormError
                  message={
                    ((touched.lastName || isSubmitted) && errors?.lastName) ||
                    undefined
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  icon={<Mail size={15} />}
                  type="email"
                  name="email"
                  placeholder="John@email.com"
                  label="Email"
                  value={contactMessageData.email}
                  onChange={handleChange}
                  hasError={
                    ((touched.email || isSubmitted) && errors?.email) ||
                    undefined
                  }
                />
                <FormError
                  message={
                    ((touched.email || isSubmitted) && errors?.email) ||
                    undefined
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  icon={<Phone size={15} />}
                  type="tel"
                  name="phoneNumber"
                  placeholder="+233 59-649-8006"
                  label="Phone"
                  value={contactMessageData.phoneNumber}
                  onChange={handleChange}
                  hasError={
                    ((touched.phoneNumber || isSubmitted) &&
                      errors?.phoneNumber) ||
                    undefined
                  }
                />
                <FormError
                  message={
                    ((touched.phoneNumber || isSubmitted) &&
                      errors?.phoneNumber) ||
                    undefined
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-base">
                <label className=" text-gray-600">Select</label>
                <select
                  name="subject"
                  value={contactMessageData.subject}
                  onChange={handleChange}
                  className={`w-full bg-grayDark rounded-sm border p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15] ${
                    errors?.subject ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select a Subject
                  </option>
                  <option value="booking_enquiry">Booking Enquiry</option>
                  <option value="customer_support">Customer Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                <FormError
                  message={
                    ((touched.subject || isSubmitted) && errors?.subject) ||
                    undefined
                  }
                />
              </div>

              <div className="flex flex-col gap-2 text-base">
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  name="message"
                  value={contactMessageData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you?"
                  className={`w-full bg-grayDark rounded-sm border p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15] ${
                    errors?.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <FormError
                  message={
                    ((touched.message || isSubmitted) && errors?.message) ||
                    undefined
                  }
                />
              </div>

              <button
                type="submit"
                className={`p-2 bg-primary text-accent font-bold lg:hover:bg-primary/80 rounded-md shadow-xs ${
                  isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
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
                    Send Message
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

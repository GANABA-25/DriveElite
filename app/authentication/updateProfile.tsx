import React from "react";

import Input from "@/components/input";

import { User, Mail, Phone, Upload } from "lucide-react";

export default function UpdateProfile() {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="relative flex items-center justify-center h-full">
          <div className="relative w-20 h-20 rounded-full overflow-hidden p-2">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/80 animate-[spin_20s_linear_infinite]" />
            <img
              className="w-full h-full rounded-full"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1727979151/PORTFOLIO/original_picture_rq8bmg.jpg"
              alt="profile"
            />
          </div>

          <div className="absolute bottom-0 right-40 bg-blue-400 text-white rounded-full p-2">
            <Upload size={15} />
          </div>
        </div>
        <h1 className="text-xs text-center text-gray-500">
          Upload a profile picture
        </h1>
        <div className="flex flex-col gap-2">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            icon={<User size={15} />}
            placeholder="John"
            // value={signUpData.firstName}
            // onChange={handleChange}
            // hasError={touched.firstName && errors?.firstName}
          />
          {/* <FormError message={touched.firstName && errors?.firstName} /> */}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label="last Name"
            type="text"
            name="lastName"
            icon={<User size={15} />}
            placeholder="Doe"
            // value={signUpData.firstName}
            // onChange={handleChange}
            // hasError={touched.firstName && errors?.firstName}
          />
          {/* <FormError message={touched.firstName && errors?.firstName} /> */}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label="Email Address"
            type="email"
            name="email"
            icon={<Mail size={15} />}
            placeholder="you@gmail.com"
            // value={signUpData.firstName}
            // onChange={handleChange}
            // hasError={touched.firstName && errors?.firstName}
          />
          {/* <FormError message={touched.firstName && errors?.firstName} /> */}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            icon={<Phone size={15} />}
            placeholder="+233 XX XXX XXXX"
            // value={signUpData.firstName}
            // onChange={handleChange}
            // hasError={touched.firstName && errors?.firstName}
          />
          {/* <FormError message={touched.firstName && errors?.firstName} /> */}
        </div>

        <button
          // onClick={() => setOpen(false)}
          className="bg-accent text-white px-4 py-2 rounded-md w-full"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

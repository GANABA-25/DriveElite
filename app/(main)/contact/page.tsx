import { Send, BookOpenCheck, Mail, Phone } from "lucide-react";

import ContactCard from "./contact-card";
import Input from "@/components/input";
import Button from "@/components/button";

export default function ContactPage() {
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

        <form className="flex justify-center items-center gap-4">
          <div className="w-200 p-8 flex flex-col gap-4 border border-gray-200 rounded-md shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                icon={<BookOpenCheck size={15} />}
                type="name"
                placeholder="John"
                label="First Name"
              />
              <Input
                icon={<BookOpenCheck size={15} />}
                type="name"
                placeholder="Doe"
                label="Last Name"
              />
              <Input
                icon={<Mail size={15} />}
                type="email"
                placeholder="John@email.com"
                label="Email"
              />
              <Input
                icon={<Phone size={15} />}
                type="phone"
                placeholder="+233 59-649-8006"
                label="Phone"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 text-base">
                <label className=" text-gray-600">Select</label>

                <select
                  name="subject"
                  className="w-full bg-grayDark rounded-sm border border-gray-300 p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an Subject
                  </option>
                  <option value="booking_enquiry">Booking Enquiry</option>
                  <option value="customer_support">Customer Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-4 text-base">
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  className="w-full bg-grayDark rounded-sm border border-gray-300 p-2 md:p-4 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[#FACC15]"
                  type="textarea"
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>

              <Button className="w-full flex justify-center items-center gap-4 p-2 rounded-md bg-primary font-bold text-base">
                <Send size={20} />
                Send Message
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

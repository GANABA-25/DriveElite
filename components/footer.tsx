import Input from "./input";
import Button from "./button";
import { Mail, Car, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <section className="border border-gray-200 px-4 lg:px-0 mt-25">
        <div className="max-w-360 mx-auto py-12">
          <div className="flex flex-col max-[767px]:gap-4 md:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-2xl font-bold">
                Get Exclusive Offers
              </h1>
              <p className="text-gray-500 text-base">
                Subscribe to our newsletter for special deals and updates.
              </p>
            </div>
            <form className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Enter your email"
                icon={<Mail size={15} />}
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="border border-gray-200 px-4 lg:px-0 py-12">
        <div className="max-w-360 mx-auto flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#0F172A] p-2 rounded-xl">
                <Car color="#FACC15" />
              </div>
              <h1 className="text-2xl font-bold">
                Drive<span className="text-[#FACC15]">Elite</span>
              </h1>
            </div>

            <p className="text-gray-500 text-base">
              Premium car rental service offering luxury <br /> and performance
              vehicles for every <br /> occasion.
            </p>

            <div className="flex items-center gap-2">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="group bg-gray-200 p-2 rounded-md transition-all duration-300 ease-out lg:hover:bg-gray-300 lg:hover:scale-110 lg:hover:shadow-sm lg:hover:cursor-pointer"
                  >
                    <Icon
                      size={18}
                      className="text-gray-600 transition-colors duration-300 ease-out group-hover:text-black"
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-bold">Quick Links</h1>
            <ul className="flex flex-col gap-4 text-gray-500 text-base">
              {["Home", "Our Fleet", "About Us", "Contact", "FAQ"].map(
                (item) => (
                  <li
                    key={item}
                    className="transition-all duration-300 ease-out lg:hover:text-black lg:hover:scale-[1.03] lg:hover:font-medium lg:hover:cursor-pointer"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-bold">Vehicle Types</h1>
            <ul className="flex flex-col gap-4 text-gray-500 text-base">
              {[
                "Luxury Sedans",
                "Sports Cars",
                "SUVs",
                "Electric Vehicles",
                "Convertibles",
              ].map((item) => (
                <li
                  key={item}
                  className="transition-all duration-300 ease-out lg:hover:text-black lg:hover:scale-[1.03] lg:hover:font-medium lg:hover:cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-bold">Contact Us</h1>
            <ul className="flex flex-col gap-4 text-gray-500 text-base">
              {[
                {
                  icon: MapPin,
                  text: "Kumasi-Ashanti-Region Ghana",
                },
                {
                  icon: Phone,
                  text: "+233 596-649-8006",
                },
                {
                  icon: Mail,
                  text: "nathanielowusu01@gmail.com",
                },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 transition-all duration-300 ease-out lg:hover:text-black lg:hover:scale-[1.03] lg:hover:font-medium lg:hover:cursor-pointer"
                >
                  <Icon className="text-[#FACC15]" size={18} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto text-gray-500 py-4 flex flex-col max-[767px]:gap-4 md:flex-row justify-between items-center px-4 lg:px-0">
        <h1 className="text-base">© 2025 DriveElite. All rights reserved.</h1>
        <ul className="flex text-sm items-center gap-4">
          <li className="text-gray-500 transition-colors duration-300 ease-out lg:hover:text-black lg:hover:cursor-pointer">
            Privacy Policy
          </li>
          <li className="text-gray-500 transition-colors duration-300 ease-out lg:hover:text-black lg:hover:cursor-pointer">
            Terms of Service
          </li>
          <li className="text-gray-500 transition-colors duration-300 ease-out lg:hover:text-black lg:hover:cursor-pointer">
            Cookie Policy
          </li>
        </ul>
      </section>
    </div>
  );
}

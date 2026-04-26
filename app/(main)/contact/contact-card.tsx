import { Clock, MapPin, Phone, Mail } from "lucide-react";

const contactData = [
  {
    icon: <MapPin />,
    title: "Visit Us",
    primary: "123 Luxury Drive",
    secondary: "Beverly Hills, CA 90210",
  },
  {
    icon: <Phone />,
    title: "Call Us",
    primary: "+1 (310) 555-0198",
    secondary: "Available during business hours",
  },
  {
    icon: <Mail />,
    title: "Email Us",
    primary: "contact@driveelite.com",
    secondary: "support@driveelite.com",
  },
  {
    icon: <Clock />,
    title: "Working Hours",
    primary: "Mon – Fri: 8:00 AM – 8:00 PM",
    secondary: "Sat – Sun: 9:00 AM – 6:00 PM",
  },
];

export default function ContactCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {contactData.map((data) => (
        <div
          key={data.title}
          className="group bg-white p-8 flex flex-col items-center text-center gap-3 rounded-xl shadow-md transition-all duration-300 ease-out lg:cursor-pointer lg:hover:-translate-y-2 lg:hover:scale-[1.02] lg:hover:shadow-[0_0_40px_rgba(252,244,207,0.9)] lg:hover:ring-1 lg:hover:ring-[#fcf4cf]/60"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eceef1] text-xl font-black transition-transform duration-300 group-hover:scale-110">
            {data.icon}
          </div>

          <h1 className="text-xl font-bold">{data.title}</h1>

          <p className="transition-colors duration-300 text-base group-hover:text-bold">
            {data.primary}
          </p>

          <p className="text-gray-500 transition-colors text-base duration-300 group-hover:text-gray-600">
            {data.secondary}
          </p>
        </div>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";

interface stepDataTypes {
  icon: ReactNode;
  number: string;
  title: string;
  text: React.ReactNode;
}

export default function Step({ icon, number, title, text }: stepDataTypes) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative z-10 bg-[#0F172A] p-8 rounded-md lg:hover:shadow-[0_0_40px_rgba(252,244,207,0.9)] lg:hover:ring-1 lg:hover:ring-[#fcf4cf]/60">
        {icon}

        <span className="absolute -top-3 -right-3 bg-[#FACC15] text-black text-base font-bold w-8 h-8 flex items-center justify-center rounded-full">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-500 text-base leading-relaxed">{text}</p>
    </div>
  );
}

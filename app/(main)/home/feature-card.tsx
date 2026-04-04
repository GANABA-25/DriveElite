import type { LucideIcon } from "lucide-react";

interface FeatureCardTypes {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor,
}: FeatureCardTypes) {
  return (
    <div
      className="group
          bg-white p-8 flex flex-col gap-4 rounded-md shadow-md transition-all duration-300 ease-out lg:cursor-pointer lg:hover:-translate-y-2 lg:hover:scale-[1.02] lg:hover:shadow-[0_0_40px_rgba(252,244,207,0.9)] lg:hover:ring-1 lg:hover:ring-[#fcf4cf]/60 z-10"
    >
      <div className="bg-[#fcf4cf] p-4 rounded-xl w-14 transition-transform duration-300 group-hover:scale-110">
        <Icon color={iconColor} />
      </div>

      <h1 className="text-xl font-bold transition-colors duration-300 group-hover:text-black">
        {title}
      </h1>

      <p className="text-gray-500 text-base transition-colors duration-300 group-hover:text-gray-600">
        {description}
      </p>
    </div>
  );
}

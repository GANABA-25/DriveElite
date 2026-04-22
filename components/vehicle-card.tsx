import { Users, Fuel, Gauge } from "lucide-react";
import Button from "./button";
import Link from "next/link";

interface VehicleData {
  _id?: string;
  category: string;
  imageUrl: string;
  name: string;
  seats: number;
  fuel: string;
  speed: string;
  price: number;
}

export default function VehicleCard({ data }: { data: VehicleData }) {
  const { category, imageUrl, name, seats, fuel, speed, price } = data;
  return (
    <Link
      className="relative group border border-gray-200 rounded-md shadow-md overflow-hidden transition-all duration-300 ease-out lg:cursor-pointer lg:hover:-translate-y-2 lg:hover:scale-[1.02] lg:hover:shadow-[0_0_40px_rgba(252,244,207,0.9)] lg:hover:ring-1 lg:hover:ring-[#fcf4cf]/60"
      href={`/fleet/${data._id}`}
    >
      <h1 className="absolute top-5 left-5 z-10 bg-[#FACC15] py-1 px-4 rounded-full text-sm">
        {category}
      </h1>

      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={category}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col gap-4 py-6 px-8">
        <h1 className="text-xl font-bold">{name}</h1>

        <div className="flex items-center gap-4 text-base">
          <div className="flex items-center gap-2 text-gray-500">
            <Users size={20} />
            <p>{seats}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Fuel size={20} />
            <p>{fuel}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Gauge size={20} />
            <p>{speed}</p>
          </div>
        </div>

        <div className="bg-gray-200 w-full h-0.5" />

        <div className="flex items-center justify-between ">
          <h1 className="text-2xl">
            <span className="text-[#FACC15] font-black">${price}</span>
            <span className="text-gray-500 text-sm">/day</span>
          </h1>
          <Button>View Details</Button>
        </div>
      </div>
    </Link>
  );
}

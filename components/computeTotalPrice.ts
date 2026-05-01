import { bookingDataTypes } from "@/@types/auth";

type ComputeTotalPriceProps = {
  bookingData: bookingDataTypes;
  carPrice: number;
};

const extrasConfig = {
  gps: 10,
  childSeat: 15,
  additionalDriver: 20,
  fullInsurance: 35,
};

export const computeTotalPrice = ({
  bookingData,
  carPrice,
}: ComputeTotalPriceProps) => {
  if (!bookingData.pickupDate || !bookingData.returnDate) {
    return {
      days: 0,
      basePrice: 0,
      extrasTotal: 0,
      totalPrice: 0,
    };
  }

  const start = new Date(bookingData.pickupDate);
  const end = new Date(bookingData.returnDate);

  const diffTime = end.getTime() - start.getTime();

  let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // ensure minimum of 1 day
  if (days <= 0) days = 1;

  const basePrice = carPrice * days;

  const extrasTotal = Object.entries(bookingData.extras || {}).reduce(
    (sum, [key, value]) => {
      if (!value) return sum;

      const price = extrasConfig[key as keyof typeof extrasConfig] || 0;

      return sum + price * days;
    },
    0,
  );

  return {
    days,
    basePrice,
    extrasTotal,
    totalPrice: basePrice + extrasTotal,
  };
};

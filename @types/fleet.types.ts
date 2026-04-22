export interface fleetFiltersDataTypes {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  seats: number;
  fuel: string;
  speed: string;
  description: string;
  features: string[];
  specs: {
    engine: string;
    transmission: string;
    horsepower: string;
    acceleration: string;
    fuelEconomy: string;
    trunk: string;
  };
}

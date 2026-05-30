export interface bookingDataTypes {
  stage: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  ghanaCard: string;
  driverLicense: string;
  fleetId: String;
  extras?: {
    gps?: boolean;
    childSeat?: boolean;
    additionalDriver?: boolean;
    fullInsurance?: boolean;
  };
}

export type bookingFormState = {
  status?: "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof bookingDataTypes, string>>;
  booking?: {
    fleetId: string;
  };
};

export interface TripDetailsDataTypes {
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
}

export interface CustomerDetailsDataTypes {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  ghanaCard: string;
  driverLicense: string;
}

export interface ExtrasFormDataTypes {
  extras?: {
    gps?: false;
    childSeat?: false;
    additionalDriver?: false;
    fullInsurance?: false;
  };
}

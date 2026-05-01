export interface FormDataTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export type FormState = {
  status?: "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof FormDataTypes, string>>;
  profile?: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
  details?: {};
};

export interface SignInDataTypes {
  phoneNumber?: string;
  email?: string;
  authMethod: string;
}

export type SignInFormState = {
  status?: "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof SignInDataTypes, string>>;
  data?: {
    email?: string;
    phoneNumber?: string;
  };
};

export interface verifyEmailDataTypes {
  token: string;
  email: string;
}

export interface contactFormSate {
  status?: "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof FormDataTypes, string>>;
}

export interface contactUsDataTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface bookingDataTypes {
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
  fleetId: string;
  extras: {
    gps: boolean;
    childSeat: boolean;
    additionalDriver: boolean;
    fullInsurance: boolean;
  };
}

export interface bookingDataTypesStageOne {
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
}

export interface bookingDataTypesStageTwo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  ghanaCard: string;
  driverLicense: string;
}

export interface bookingDataTypesStageThree {
  extras?: {
    gps?: boolean;
    childSeat?: boolean;
    additionalDriver?: boolean;
    fullInsurance?: boolean;
  };
}

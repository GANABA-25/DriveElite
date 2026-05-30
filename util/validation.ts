import {
  FormDataTypes,
  SignInDataTypes,
  contactUsDataTypes,
} from "@/@types/auth";
import { bookingDataTypes, TripDetailsDataTypes } from "@/@types/bookingTypes";

type BookingValidationErrors = Partial<Record<keyof bookingDataTypes, string>>;

export type PaymentDataTypes = {
  paymentDetails: {
    paymentOption: string;
    mobileMoney: {
      provider: string;
      accountNumber: string;
      accountName: string;
    };
    card: {
      cardNumber: string;
      cardName: string;
      cardExpiryDate: string;
      cardCvv: string;
    };
  };
};

export const validateSignUpData = (signUpData: FormDataTypes) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    signUpData;

  const errors = {
    firstName: !firstName.trim() ? "First name is required" : "",

    lastName: !lastName.trim() ? "Last name is required" : "",

    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",

    phoneNumber: !phoneNumber.trim()
      ? "Phone number is required"
      : !/^[0-9]{10}$/.test(phoneNumber)
        ? "Phone number must be exactly 10 digits"
        : "",

    password: !password.trim()
      ? "Password is required"
      : password.length < 8
        ? "Password must be at least 8 characters long"
        : !/[A-Z]/.test(password)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(password)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(password)
                ? "Password must contain at least one special character"
                : "",

    confirmPassword: !confirmPassword.trim()
      ? "Confirm password is required"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "",
  };

  return errors;
};

export const validateSignInData = (signinData: SignInDataTypes) => {
  const { phoneNumber, email, authMethod } = signinData;

  if (authMethod === "email") {
    const emailValue = email || "";

    return {
      email: !emailValue.trim()
        ? "A valid email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
          ? "Incorrect email format"
          : "",
    };
  }

  if (authMethod === "phone") {
    const phoneValue = phoneNumber || "";

    return {
      phoneNumber: !phoneValue.trim()
        ? "Phone number is required"
        : phoneValue.length !== 10
          ? "Phone number must be exactly 10 digits"
          : !/^[0-9]{10}$/.test(phoneValue)
            ? "Invalid phone number format"
            : "",
    };
  }

  return {};
};

export const validateContactMessageData = (
  contactMessageData: contactUsDataTypes,
) => {
  const { firstName, lastName, email, phoneNumber, subject, message } =
    contactMessageData;

  const errors = {
    firstName: !firstName.trim() ? "First name is required" : "",

    lastName: !lastName.trim() ? "Last name is required" : "",

    email: !email.trim()
      ? "A valid email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Incorrect email format"
        : "",

    phoneNumber: !phoneNumber.trim()
      ? "Phone number is required"
      : !/^[0-9]{10}$/.test(phoneNumber)
        ? "Phone number must be exactly 10 digits"
        : "",

    subject: !subject.trim() ? "Subject is required" : "",

    message: !message.trim() ? "Message is required" : "",
  };

  return errors;
};

export const validateBookingData = (
  bookingData: bookingDataTypes,
): BookingValidationErrors => {
  const errors: BookingValidationErrors = {};

  if (bookingData.stage === "TripDetails") {
    const {
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
    } = bookingData;

    if (!pickupDate.trim()) {
      errors.pickupDate = "Pickup date is required";
    }

    if (!returnDate.trim()) {
      errors.returnDate = "Return date is required";
    }

    if (!pickupTime.trim()) {
      errors.pickupTime = "Pickup time is required";
    }

    if (!returnTime.trim()) {
      errors.returnTime = "Return time is required";
    }

    if (!pickupLocation.trim()) {
      errors.pickupLocation = "Pickup location is required";
    }

    if (!returnLocation.trim()) {
      errors.returnLocation = "Return location is required";
    }

    const now = new Date();

    if (pickupDate) {
      const pickup = new Date(`${pickupDate}T${pickupTime || "00:00"}`);

      if (pickup < now) {
        errors.pickupDate = "Pickup date/time cannot be in the past";
      }
    }

    if (pickupDate && returnDate) {
      const pickup = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
      const dropoff = new Date(`${returnDate}T${returnTime || "00:00"}`);

      if (dropoff <= pickup) {
        errors.returnDate = "Return date/time must be after pickup";
      }
    }
  }

  if (bookingData.stage === "CustomerDetails") {
    const { fullName, email, phoneNumber, address, ghanaCard, driverLicense } =
      bookingData;

    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!ghanaCard.trim()) {
      errors.ghanaCard = "Ghana card is required";
    }

    if (!driverLicense.trim()) {
      errors.driverLicense = "Driver license is required";
    }
  }

  return errors;
};

export const validateAllBookingData = (
  bookingData: bookingDataTypes,
): BookingValidationErrors => {
  const errors: BookingValidationErrors = {};

  const {
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    pickupLocation,
    returnLocation,
    fullName,
    email,
    phoneNumber,
    address,
    ghanaCard,
    driverLicense,
  } = bookingData;

  if (!pickupDate.trim()) {
    errors.pickupDate = "Pickup date is required";
  }

  if (!returnDate.trim()) {
    errors.returnDate = "Return date is required";
  }

  if (!pickupTime.trim()) {
    errors.pickupTime = "Pickup time is required";
  }

  if (!returnTime.trim()) {
    errors.returnTime = "Return time is required";
  }

  if (!pickupLocation.trim()) {
    errors.pickupLocation = "Pickup location is required";
  }

  if (!returnLocation.trim()) {
    errors.returnLocation = "Return location is required";
  }

  const now = new Date();

  if (pickupDate) {
    const pickup = new Date(`${pickupDate}T${pickupTime || "00:00"}`);

    if (pickup < now) {
      errors.pickupDate = "Pickup date/time cannot be in the past";
    }
  }

  if (pickupDate && returnDate) {
    const pickup = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const dropoff = new Date(`${returnDate}T${returnTime || "00:00"}`);

    if (dropoff <= pickup) {
      errors.returnDate = "Return date/time must be after pickup";
    }
  }

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  }

  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  }

  if (!address.trim()) {
    errors.address = "Address is required";
  }

  if (!ghanaCard.trim()) {
    errors.ghanaCard = "Ghana card is required";
  }

  if (!driverLicense.trim()) {
    errors.driverLicense = "Driver license is required";
  }

  return errors;
};

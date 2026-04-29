import {
  FormDataTypes,
  SignInDataTypes,
  contactUsDataTypes,
  bookingDataTypes,
  bookingDataTypesStageOne,
  bookingDataTypesStageTwo,
} from "@/@types/auth";

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

export const validateBookingDataStageOne = (
  bookingDetails: bookingDataTypesStageOne,
) => {
  const {
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    pickupLocation,
    returnLocation,
  } = bookingDetails;

  const errors: Record<keyof bookingDataTypesStageOne, string> = {
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    returnTime: "",
    pickupLocation: "",
    returnLocation: "",
  };

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

  if (pickupDate && returnDate) {
    const pickup = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const dropoff = new Date(`${returnDate}T${returnTime || "00:00"}`);

    const now = new Date();

    if (pickup < now) {
      errors.pickupDate = "Pickup date/time cannot be in the past";
    }

    if (dropoff <= pickup) {
      errors.returnDate = "Return date/time must be after pickup";
    }
  }

  return errors;
};

export const validateBookingDataStageTwo = (
  bookingDetails: bookingDataTypesStageTwo,
) => {
  const { fullName, email, phoneNumber, address, ghanaCard, driverLicense } =
    bookingDetails;

  const errors = {
    fullName: !fullName.trim() ? "First name is required" : "",

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

    address: !address.trim() ? "Address is required" : "",

    ghanaCard: !ghanaCard.trim()
      ? "Ghana Card number is required"
      : !/^GHA-\d{9}-\d$/.test(ghanaCard)
        ? "Format must be like GHA-123456789-1"
        : "",

    driverLicense: !driverLicense.trim() ? "Driver's license is required" : "",
  };

  return errors;
};

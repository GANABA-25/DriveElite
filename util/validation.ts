import { FormDataTypes } from "@/@types/auth";
import { SignInDataTypes } from "@/@types/auth";

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

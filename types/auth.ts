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
};

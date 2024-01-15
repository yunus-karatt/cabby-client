import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import React from "react";

export interface CustomWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;
}

export interface OtpInputProps {
  id: string;
  previousId: string | null;
  nextId: string | null;
  value: string;
  onValueChange: (id: string, value: string) => void;
  handleSubmit: () => void;
}

export interface MobileInputProps {
  number: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export interface AxiosData {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

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
  error:boolean;
  onValueChange: (id: string, value: string) => void;
  handleSubmit: () => void;
}

export interface MobileInputProps {
  number: string;
  role:"Admin"|"User"|"Driver"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isLoading?:boolean
}

export interface AxiosData {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

export interface CabInteface {
  _id: string;
  cabType: string;
  basePrice: number |null;
  pricePerKm: number |null;
  image: string;
  maxPersons:number
}

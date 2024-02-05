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
  error: boolean;
  onValueChange: (id: string, value: string) => void;
  handleSubmit: () => void;
}

export interface MobileInputProps {
  number: string;
  role: "Admin" | "User" | "Driver";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isLoading?: boolean;
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
  basePrice: number | null;
  pricePerKm: number | null;
  image: string;
  maxPersons: number;
}

interface Geometry {
  coordinates: [number, number][];
  type: string;
}

export interface Maneuver {
  instruction: string;
  location: [number, number];
}

export interface DirectionsApiResponse {
  code: string;
  uuid: string;
  waypoints: {
    distance: number;
    name: string;
    location: [number, number];
  }[];
  routes: {
    distance: number;
    duration: number;
    geometry: Geometry;
    legs: {
      via_waypoints: [];
      admins: {
        iso_3166_1: string;
        iso_3166_1_alpha3: string;
      }[];
      distance: number;
      duration: number;
      steps: {
        distance: number;
        duration: number;
        geometry: Geometry;
        maneuver: Maneuver
      }[];
      summary: string;
      weight: number;
    }[];
    weight: number;
    weight_name: string;
  }[];
}

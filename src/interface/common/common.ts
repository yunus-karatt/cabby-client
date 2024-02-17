import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import React from "react";
import { DriverData } from "../driver/driverInterface";

export interface CustomWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;
  Razorpay?:any
  
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

export interface Geometry {
  coordinates: [number, number][];
  type: string;
}

export interface Maneuver {
  instruction: string;
  location: [number, number];
}

export interface Steps{
  
    distance: number;
    duration: number;
    geometry: Geometry;
    maneuver: Maneuver
  
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
      steps: Steps[];
      summary: string;
      weight: number;
    }[];
    weight: number;
    weight_name: string;
  }[];
}
export interface ScheduledRideInterface {
  driverId?: string;
  userId: string;
  sourceCoordinates: {
    latitude: number;
    longitude: number;
  };
  destinationCoordinates: {
    latitude: number;
    longitude: number;
  };
  sourceLocation: string;
  destinationLocation: string;
  distance: number;
  price: number;
  pickUpDate:Date;
  feedback?: string;
  rating?: number;
  duration:number;
  cabId:string;
  _id:string;
  otp?:string;
  driverCoordinates: {
    latitude: number;
    longitude: number;
  };
  status: string;
  date: Date;


}
export interface ScheduledRideInterfaceWithDriver extends ScheduledRideInterface{
  driverData:DriverData
}
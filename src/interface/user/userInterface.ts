import { SocketState } from "../../services/redux/slices/driverSocket";
import { Admin } from "../admin/adminInterface";
import { Driver } from "../driver/driverInterface";

export interface ExistingUser {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email?: string;
}
export interface UserAuthSlice {
  userInfo: ExistingUser;
}

export interface AdminAuthSlice {
  adminInfo: Admin;
}
export interface DriverAuthSlice {
  driverInfo: Driver;
}

export interface UserCurrentRideData{
  currentRideData:CurrentRideData
}

export interface rootState {
  userAuth: UserAuthSlice;
  adminAuth: AdminAuthSlice;
  driverAuth: DriverAuthSlice;
  routeCoordinates: RouteCoordinates;
  driverSocket:SocketState,
  userSocket:SocketState,
  userCurrentRide:UserCurrentRideData
}



export interface UserData {
  RideDetails: { completedRides: number; cancelledRides: number };
  createdAt: string;
  email: string;
  firstName: string;
  isBlocked: boolean;
  joinedAt: string;
  lastName: string;
  mobile: string | null;
  updatedAt: string;
  _id: string;
}

// export interface LocationSuggestion{
//   place_name:string

export interface RouteCoordinates {
  source: {
    latitude: number;
    longitude: number;
    placeName: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    placeName: string;
  };
}

export interface CurrentRideData {
  status: string;
  _id: string;
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
  feedback?: string;
  rating?: number;
  duration: number;
  date: Date;
  driverId?: string;
  driverData: {
    cabModel: {
      cabType: string;
      image: string;
      _id: string;
    }[];
    email: string;
    firstName: string;
    lastName: string;
  };
  otp: number;
  driverCoordinates: {
    latitude: number;
    longitude: number;
  };
  pickUpDate?:Date
}

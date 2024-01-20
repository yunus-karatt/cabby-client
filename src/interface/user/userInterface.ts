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

export interface rootState {
  userAuth: UserAuthSlice;
  adminAuth: AdminAuthSlice;
  driverAuth: DriverAuthSlice;
}

export interface UserData {
  RideDetails: { completedRides: number; cancelledRides: number };
  createdAt: string;
  email: string;
  firstName: string;
  isBlocked: boolean;
  joinedAt: string;
  lastName: string;
  mobile: string|null;
  updatedAt: string;
  __v: number;
  _id: string;
}

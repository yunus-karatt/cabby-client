import { Admin } from "../admin/adminInterface";

export interface ExistingUser {
  _id: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  email?:string;
}
export interface UserAuthSlice {
  userInfo: ExistingUser;
}

export interface AdminAuthSlice{
  adminInfo:Admin
}

export interface rootState {
  userAuth:UserAuthSlice
  adminAuth:AdminAuthSlice
}
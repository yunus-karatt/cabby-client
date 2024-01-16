export interface ExistingUser {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
}
export interface UserAuthSlice {
  userInfo: ExistingUser;
}

export interface rootState {
  userAuth:UserAuthSlice
}
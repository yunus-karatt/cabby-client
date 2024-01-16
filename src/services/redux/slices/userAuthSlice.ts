import { createSlice } from "@reduxjs/toolkit";
import { ExistingUser } from "../../../interface/user/userInterface";

interface UserAuthSate{
  userInfo:ExistingUser|null
}

const initialState:UserAuthSate = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : null,
};

const userAuthslice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout:(state)=>{
      state.userInfo=null
      localStorage.removeItem("userInfo")
    }
  },
});

export const { setCredentials,logout } = userAuthslice.actions;
export default userAuthslice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Driver } from "../../../interface/driver/driverInterface";

interface DriverAuthState{
  driverInfo:Driver|null
}

const initialState:DriverAuthState = {
  driverInfo: localStorage.getItem("driverInfo")
    ? JSON.parse(localStorage.getItem("driverInfo") || "")
    : null,
};

const driverAuthSlice = createSlice({
  name: "driverAuth",
  initialState,
  reducers: {
    setDriverCredentials: (state, action) => {
      state.driverInfo = action.payload;
      localStorage.setItem("driverInfo", JSON.stringify(action.payload));
    },
    logout:(state)=>{
      state.driverInfo=null
      localStorage.removeItem("driverInfo")
      localStorage.removeItem("driverToken")
    }
  },
});

export const { setDriverCredentials,logout } = driverAuthSlice.actions;
export default driverAuthSlice.reducer;

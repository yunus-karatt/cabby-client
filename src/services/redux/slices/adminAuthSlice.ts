import { createSlice } from "@reduxjs/toolkit";
import { Admin } from "../../../interface/admin/adminInterface";

interface AdminAuthState{
  adminInfo:Admin|null
}

const initialState:AdminAuthState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo") || "")
    : null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    logout:(state)=>{
      state.adminInfo=null
      localStorage.removeItem("adminInfo")
    }
  },
});

export const { setAdminCredentials,logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

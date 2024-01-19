import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/userAuthSlice'
import adminAuthSlice from "./slices/adminAuthSlice";
import driverAuthSlice from "./slices/driverAuthSlice";

const store= configureStore({
  reducer:{
    userAuth:userAuthReducer,
    adminAuth:adminAuthSlice,
    driverAuth:driverAuthSlice
  },
  devTools:true
})

export default store
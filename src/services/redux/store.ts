import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/userAuthSlice'
import adminAuthSlice from "./slices/adminAuthSlice";
import driverAuthSlice from "./slices/driverAuthSlice";
import routeCoordinates from "./slices/userCoordinates"
const store= configureStore({
  reducer:{
    userAuth:userAuthReducer,
    adminAuth:adminAuthSlice,
    driverAuth:driverAuthSlice,
    routeCoordinates:routeCoordinates
  },
  devTools:true
})

export default store
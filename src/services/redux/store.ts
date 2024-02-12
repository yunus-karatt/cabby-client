import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/userAuthSlice'
import adminAuthSlice from "./slices/adminAuthSlice";
import driverAuthSlice from "./slices/driverAuthSlice";
import routeCoordinates from "./slices/userCoordinates"
import driverSocket from "./slices/driverSocket";
import userSocket from './slices/userSocketSlice'
import userCurrentRide from "./slices/userCurrentRideSlice";

const store= configureStore({
  reducer:{
    userAuth:userAuthReducer,
    adminAuth:adminAuthSlice,
    driverAuth:driverAuthSlice,
    routeCoordinates:routeCoordinates,
    driverSocket,
    userSocket,
    userCurrentRide,
  },
  devTools:true
})

export default store
import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/userAuthSlice'
import adminAuthSlice from "./slices/adminAuthSlice";
import driverAuthSlice from "./slices/driverAuthSlice";
import routeCoordinates from "./slices/userCoordinates"
import driverSocket from "./slices/driverSocket";
const store= configureStore({
  reducer:{
    userAuth:userAuthReducer,
    adminAuth:adminAuthSlice,
    driverAuth:driverAuthSlice,
    routeCoordinates:routeCoordinates,
    driverSocket
  },
  devTools:true
})

export default store
import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/userAuthSlice'
import adminAuthSlice from "./slices/adminAuthSlice";

const store= configureStore({
  reducer:{
    userAuth:userAuthReducer,
    adminAuth:adminAuthSlice
  },
  devTools:true
})

export default store
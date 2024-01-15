import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './slices/userAuthSlice'

const store= configureStore({
  reducer:{
    userAuth:userAuthReducer
  },
  devTools:true
})

export default store
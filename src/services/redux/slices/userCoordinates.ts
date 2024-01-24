import { createSlice } from "@reduxjs/toolkit";
import { RouteCoordinates } from "../../../interface/user/userInterface";


const initialState:RouteCoordinates={
  source:{
    long:0,
    lat:0
  },
  destination:{
    long:0,
    lat:0
  }
}

const routeCoordinates=createSlice({
  name:"routeCoordinates",
  initialState,
  reducers:{
    setSourceCoordinates:(state,action)=>{
      state.source=action.payload
    },
    setDestinationCoordinates:(state,action)=>{
      state.destination=action.payload
    }
  }
})
export const {setDestinationCoordinates,setSourceCoordinates}=routeCoordinates.actions
export default routeCoordinates.reducer
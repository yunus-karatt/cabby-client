import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export interface SocketState{
  socketIO:Socket|null
}
const initialState:SocketState={
  socketIO:null
}

const driverSocket=createSlice({
  name:'driverSocket',
  initialState,
  reducers:{
    setSocket:(state,action)=>{
      state.socketIO=action.payload
    }
  }
})

export const {setSocket}=driverSocket.actions
export default driverSocket.reducer
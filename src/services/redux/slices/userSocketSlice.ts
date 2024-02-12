import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export interface SocketState{
  socketIO:Socket|null
}
const initialState:SocketState={
  socketIO:null
}

const userSocket=createSlice({
  name:'userSocket',
  initialState,
  reducers:{
    setUserSocket:(state,action)=>{
      state.socketIO=action.payload
    }
  }
})

export const {setUserSocket}=userSocket.actions
export default userSocket.reducer
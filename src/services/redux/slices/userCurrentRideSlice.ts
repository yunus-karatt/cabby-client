// import { createSlice } from "@reduxjs/toolkit";
// import { CurrentRideData, RouteCoordinates } from "../../../interface/user/userInterface";

// // const initialState: CurrentRideData | null= {
// //    _id:'',
// //    date:new Date,
// //    destinationCoordinates:{
// //     latitude:0,
// //     longitude:0,
// //    },
// //    destinationLocation:'',
// //    distance:0,
// //    driverCoordinates:{
// //     latitude:0,
// //     longitude:0
// //    },
// //    driverData:{
// //     cabModel:[{
// //       _id:'',
// //        cabType:'',
// //        image:''
// //     }],
// //     email:'',
// //     firstName:'',
// //     lastName:''
// //    },
// //    duration:0,
// //    otp:0,
// //    price:0,
// //    sourceCoordinates:{
// //     latitude:0,
// //     longitude:0
// //    },
// //    sourceLocation:'',
// //    status:'',
// //    userId:'',
// //    driverId:'',
// //    feedback:'',
// //    rating:0
// // };

// interface CurrentRideDataState{
//   currentRideData:CurrentRideData|null
// }

// let initialState:CurrentRideDataState={currentRideData:null}
// const userCurrentRide = createSlice({
//   name: "userCurrentRide",
//   initialState,
//   reducers: {
//     setUserCurrentRideData: (state, action) => {
//       console.log({action})
//       state.currentRideData = action.payload;
//     },
//     clearUserCurrentRideData: (state, action) => {
//       state.currentRideData = null;
//     },
//   },
// });
// export const { clearUserCurrentRideData, setUserCurrentRideData } =
//   userCurrentRide.actions;
// export default userCurrentRide.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentRideData } from "../../../interface/user/userInterface";
import { ScheduledRideInterfaceWithDriver } from "../../../interface/common/common";

interface CurrentRideDataState {
  currentRideData: CurrentRideData | ScheduledRideInterfaceWithDriver | null;
}

const initialState: CurrentRideDataState = {
  currentRideData: null,
};

const userCurrentRide = createSlice({
  name: "userCurrentRide",
  initialState,
  reducers: {
    setUserCurrentRideData: (state, action: PayloadAction<CurrentRideData| ScheduledRideInterfaceWithDriver>) => {
      console.log(action.payload,'payload')
      state.currentRideData = action.payload;
    },
    clearUserCurrentRideData: (state) => {
      state.currentRideData = null;
    },
  },
});

export const { clearUserCurrentRideData, setUserCurrentRideData } =
  userCurrentRide.actions;
export default userCurrentRide.reducer;

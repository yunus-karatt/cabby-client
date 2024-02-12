import { createSlice } from "@reduxjs/toolkit";
import { RouteCoordinates } from "../../../interface/user/userInterface";

const initialState: RouteCoordinates = {
  source: {
    longitude: 0,
    latitude: 0,
    placeName: "",
  },
  destination: {
    longitude: 0,
    latitude: 0,
    placeName: "",
  },
};

const routeCoordinates = createSlice({
  name: "routeCoordinates",
  initialState,
  reducers: {
    setSourceCoordinates: (state, action) => {
      state.source = action.payload;
    },
    setDestinationCoordinates: (state, action) => {
      state.destination = action.payload;
    },
  },
});
export const { setDestinationCoordinates, setSourceCoordinates } =
  routeCoordinates.actions;
export default routeCoordinates.reducer;

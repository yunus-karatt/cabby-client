import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const userAuthslice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = userAuthslice.actions;
export default userAuthslice.reducer;

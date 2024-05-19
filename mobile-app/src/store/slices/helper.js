import { createSlice } from "@reduxjs/toolkit";

export const helper = createSlice({
  name: "helper",
  initialState: {
    isConnected: false,
  },

  reducers: {
    setIsConneted: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConneted } = helper.actions;
export default helper.reducer;

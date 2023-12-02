import { createSlice } from "@reduxjs/toolkit";

export const main = createSlice({
  name: "main",
  initialState: {
    user: {},
    isLight: true,
  },

  reducers: {
    setIsFirst: (state, action) => {
      state.isFirst = action.payload;
    },
    setLightMode: (state, action) => {
      state.isLight = action.payload;
    },
    setUserData: (state, action) => {
      console.log("state.data", state.user);
      state.user = { ...state.user, ...action.payload };
    },
    setLogout: (state, action) => {
      state.user = {};
    },
  },
});

export const { setIsFirst, setUserData, setLightMode, setLogout } =
  main.actions;
export default main.reducer;

import { combineReducers } from "@reduxjs/toolkit";
import { main, helper } from "../slices";

const rootReducer = combineReducers({
  main: main.reducer,
  helper: helper.reducer,
});

export default (state, action) => rootReducer(state, action);

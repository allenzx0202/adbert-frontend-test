import { configureStore } from "@reduxjs/toolkit";
import clickReducer from "./clickSlice";

export const store = configureStore({
  reducer: { click: clickReducer },
});

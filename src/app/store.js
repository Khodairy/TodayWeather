import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "../features/temp/tempSlice";

export const store = configureStore({
  reducer: {
    temp: tempReducer,
  },
});

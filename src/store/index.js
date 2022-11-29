import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import labSlice from "./slices/labSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lab: labSlice,
  },
});

export default store;

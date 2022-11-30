import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import labReducer from "./slices/labSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lab: labReducer,
  },
});

export default store;

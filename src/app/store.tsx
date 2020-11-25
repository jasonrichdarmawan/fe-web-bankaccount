import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authorizationReducer from "../features/authorization/authorizationSlice";

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import eventSlice from "./slices/eventSlice";

const rootReducer = combineReducers({
  eventSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

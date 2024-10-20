import { combineReducers } from "@reduxjs/toolkit";
import refetchReducer from "./refetchSlice";

const rootReducer = combineReducers({
  refetch: refetchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

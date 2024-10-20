import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export interface RefetchState {
  refetchPart: string;
}

const initialState: RefetchState = {
  refetchPart: "",
};

const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    setRefetch: (state, action: PayloadAction<string>) => {
      state.refetchPart = action.payload;
    },
    resetRefetch: (state) => {
      state.refetchPart = "";
    },
  },
});

export default refetchSlice.reducer;
export const { setRefetch, resetRefetch } = refetchSlice.actions;
export const selectRefetch = (state: RootState) => state.refetch.refetchPart;

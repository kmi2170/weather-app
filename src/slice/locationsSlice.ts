import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLocationsState } from "../store/initialLocationsState";
import { asyncThunkFindLocations } from "./locationsAsyncThunk";
import { LocationType } from "../api/types";

export const locationsSlice = createSlice({
  name: "locations",
  initialState: initialLocationsState,
  reducers: {
    setLocations: (state, action: PayloadAction<LocationType[]>) => {
      state.locations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncThunkFindLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncThunkFindLocations.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncThunkFindLocations.rejected, (state, error) => {
        state.isLoading = false;
        state.isError = true;
        console.log(error);
      });
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { initialMapState } from "../store/initialMapState";
// import {
//   asyncThunkIpLookupLocation,
//   asyncThunkSearchLocation,
// } from "./weatherAsyncThunk";

export const weatherMapSlice = createSlice({
  name: "weatherMap",
  initialState: initialMapState,
  reducers: {
    setWeatherMap: (state, action: PayloadAction<any>) => {
      state.map = action.payload;
    },
    // setUnits: (state, action: PayloadAction<Units>) => {
    //   state.units = action.payload;
    // },
    // setSelectedPageId: (state, action: PayloadAction<number>) => {
    //   state.selectedPageId = action.payload;
    // },
    // setIsNotFound: (state, action: PayloadAction<boolean>) => {
    //   state.isNotFound = action.payload;
    // },
    // setLang: (state, action: PayloadAction<Lang>) => {
    //   state.lang = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(asyncThunkIpLookupLocation.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(asyncThunkIpLookupLocation.fulfilled, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(asyncThunkIpLookupLocation.rejected, (state, error) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     console.log(error);
    //   })
    //   .addCase(asyncThunkSearchLocation.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(asyncThunkSearchLocation.fulfilled, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(asyncThunkSearchLocation.rejected, (state, error) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     console.log(error);
    //   });
  },
});

// export const selectWeather = (state: RootState) => state.weather;

export const { setWeatherMap } = weatherMapSlice.actions;

export default weatherMapSlice.reducer;

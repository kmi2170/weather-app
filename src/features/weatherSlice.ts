import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  initialState,
  IpLocation,
  Location,
  Units,
  Lang,
} from "./initialState";

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setIpLocation: (state, action: PayloadAction<IpLocation>) => {
      state.ipLocation = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    setUnits: (state, action: PayloadAction<Units>) => {
      state.units = action.payload;
    },
    setLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
    setWeatherCurrent: (state, action: PayloadAction<[]>) => {
      state.weatherCurrent = action.payload;
    },
    setWeatherOnecall: (state, action: PayloadAction<[]>) => {
      state.weatherOnecall = action.payload;
    },
    setSelectedPageId: (state, action: PayloadAction<number>) => {
      state.selectedPageId = action.payload;
    },
  },
  /* extraReducers: (builder) => {
    builder
      .addCase(fetchAdviceQuote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdviceQuote.fulfilled, (state) => {
        console.log("fullfilled");
        state.isLoading = false;
      })
      .addCase(fetchAdviceQuote.rejected, (state, error) => {
        state.isLoading = false;
        state.isError = true;
        console.log(error);
      });
  }, */
});

export const selectWeather = (state: RootState) => state.weather;

export const {
  setIpLocation,
  setLocation,
  setWeatherCurrent,
  setWeatherOnecall,
  setUnits,
  setLang,
} = weatherSlice.actions;

export default weatherSlice.reducer;

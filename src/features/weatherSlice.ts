import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  initialState,
  IpLocation,
  Location,
  Units,
  Lang,
} from "./initialState";
import {
  asyncThunkIpLookupLocation,
  asyncThunkSearchLocation,
  asyncThunkWeatherOnecall,
} from "../features/weatherAsyncThunk";

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
    /* setWeatherOnecall: (state, action: PayloadAction<[]>) => {
      state.weatherOnecall = action.payload;
    }, */
    setSelectedPageId: (state, action: PayloadAction<number>) => {
      state.selectedPageId = action.payload;
    },
    setIsNotFound: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncThunkIpLookupLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncThunkIpLookupLocation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncThunkIpLookupLocation.rejected, (state, error) => {
        state.isLoading = false;
        state.isError = true;
        console.log(error);
      })
      .addCase(asyncThunkSearchLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncThunkSearchLocation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncThunkSearchLocation.rejected, (state, error) => {
        state.isLoading = false;
        state.isError = true;
        console.log(error);
      });
    /* .addCase(asyncThunkWeatherOnecall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncThunkWeatherOnecall.fulfilled, (state) => {
        console.log("fullfilled");
        state.isLoading = false;
      })
      .addCase(asyncThunkWeatherOnecall.rejected, (state, error) => {
        state.isLoading = false;
        state.isError = true;
        console.log(error);
      }) */
  },
});

export const selectWeather = (state: RootState) => state.weather;

export const {
  setIpLocation,
  setLocation,
  setWeatherCurrent,
  // setWeatherOnecall,
  setUnits,
  setLang,
  setIsNotFound,
} = weatherSlice.actions;

export default weatherSlice.reducer;

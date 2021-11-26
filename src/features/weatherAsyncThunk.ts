import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  setIpLocation,
  setLocation,
  setWeatherOnecall,
} from "../features/weatherSlice";

import {
  ipLookup,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
} from "../api/lib";

export const asyncThunkIpLookupLocation = createAsyncThunk(
  "weather/asyncThunkIpLookupLocation",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const { city, state, country, lat, lon } = await ipLookup();

      dispatch(setLocation({ city, state, country, lat, lon }));

      /* const { weather: { units, lang } } = getState() as RootState;

      const dataCurrent = await fetchOpenWeatherCurrentByCityName(
        city, state, country, units, lang
      );
      const { lat, lon } = dataCurrent?.coord; */
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const asyncThunkSearchLocation = createAsyncThunk(
  "weather/asyncThunkSearchLocation",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const { city, state, country, lat, lon } = await ipLookup();

      dispatch(setLocation({ city, state, country, lat, lon }));

      /* const { weather: { units, lang } } = getState() as RootState;

      const dataCurrent = await fetchOpenWeatherCurrentByCityName(
        city, state, country, units, lang
      );
      const { lat, lon } = dataCurrent?.coord; */
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/* export const asyncThunkWeatherOnecall = createAsyncThunk(
  "weather/asyncThunkWeatherOnecall",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        weather: {
          location: { lat, lon },
          units,
          lang,
        },
      } = getState() as RootState;

      const data = await fetchOpenWeatherOnecall(+lat, +lon, units, lang);

      dispatch(setWeatherOnecall(data));
      console.log(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
); */

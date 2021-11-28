import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLocation, setIsNotFound } from "../features/weatherSlice";
import axios from "axios";

import { ipLookup } from "../api/lib";

export const asyncThunkIpLookupLocation = createAsyncThunk(
  "weather/asyncThunkIpLookupLocation",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { city, state, country, lat, lon } = await ipLookup();

      dispatch(setLocation({ city, state, country, lat, lon }));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const asyncThunkSearchLocation = createAsyncThunk(
  "weather/asyncThunkSearchLocation",
  async (q, { dispatch, rejectWithValue }) => {
    dispatch(setIsNotFound(false));

    try {
      const { data } = await axios.get(`/api/geolocation?q=${q}`);

      if (data.length !== 0) {
        const { name: city, state, country, lat, lon } = data[0];

        dispatch(setLocation({ city, state, country, lat, lon }));
      } else {
        dispatch(setIsNotFound(true));
      }
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
    } catch (error) {
      return rejectWithValue(error);
    }
  }
); */

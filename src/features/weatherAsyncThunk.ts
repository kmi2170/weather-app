import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLocation, setIsNotFound } from "../features/weatherSlice";
import axios from "axios";

import { ipLookup } from "../api/lib";

export const asyncThunkIpLookupLocation = createAsyncThunk(
  "weather/asyncThunkIpLookupLocation",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { city, region, country, lat, lon } = await ipLookup();

      dispatch(setLocation({ city, region, country, lat, lon }));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const asyncThunkSearchLocation = createAsyncThunk(
  "weather/asyncThunkSearchLocation",
  async (q: string, { dispatch, rejectWithValue }) => {
    dispatch(setIsNotFound(false));

    try {
      const { data } = await axios.get(`/api/geolocation?q=${q}`);

      if (data.length !== 0) {
        const { name: city, state: region, country, lat, lon } = data[0];

        dispatch(setLocation({ city, region, country, lat, lon }));
      } else {
        dispatch(setIsNotFound(true));
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLocation, setIsNotFound } from "../slice/weatherSlice";
import axios from "axios";

import { ipLookup } from "../api/lib";
import { Geocoding, LocationType } from "../api/types";
import { Location } from "../store/initialState";

export const asyncThunkIpLookupLocation = createAsyncThunk(
  "weather/asyncThunkIpLookupLocation",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await ipLookup();
      const { city, region, country, lat, lon } = data as Location;

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
      const { data } = await axios.get<Geocoding[]>(`/api/geolocation?q=${q}`);

      if (data.length !== 0) {
        const { name: city, state: region, country, lat, lon } = data[0];

        dispatch(setLocation({ city, region, country, lat, lon } as Location));
      } else {
        dispatch(setIsNotFound(true));
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

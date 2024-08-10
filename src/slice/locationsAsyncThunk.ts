import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsNotFound } from "./weatherSlice";
import { setLocations } from "./locationsSlice";

import { findLocations } from "../api/lib";
import { LocationType } from "../api/types";

export const asyncThunkFindLocations = createAsyncThunk(
  "weather/asyncFindLocations",
  async (q: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setIsNotFound(false));

      const data = await findLocations(q);

      if (Array.isArray(data) && data.length !== 0) {
        dispatch(setLocations(data as LocationType[]));
      } else {
        dispatch(setIsNotFound(true));
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

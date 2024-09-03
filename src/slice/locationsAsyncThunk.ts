import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLocations } from "./locationsSlice";

import { findLocations } from "../api/lib";
import { LocationType } from "../api/types";

export const asyncThunkFindLocations = createAsyncThunk(
  "weather/asyncFindLocations",
  async (q: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await findLocations(q);
      dispatch(setLocations((data || []) as LocationType[]));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

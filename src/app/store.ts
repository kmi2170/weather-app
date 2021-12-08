import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import weatherSlice from "../features/weatherSlice";
import { weatherOnecallApi } from "../services/weatherOnecallApi";

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    [weatherOnecallApi.reducerPath]: weatherOnecallApi.reducer,
  },
  middleware: (gDM) => gDM().concat(weatherOnecallApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

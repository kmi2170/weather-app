"use client";

import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
  PreloadedStateShapeFromReducersMapObject,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import weatherSlice from "../slice/weatherSlice";
import { weatherApi } from "../services/weatherApi";
import locationsSlice from "../slice/locationsSlice";

const rootReducer = combineReducers({
  weather: weatherSlice,
  locations: locationsSlice,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const setupStore = (
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(weatherApi.middleware),
  });
};
export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(weatherApi.middleware),
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

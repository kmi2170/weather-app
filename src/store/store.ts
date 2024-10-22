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
import weatherMapSlice from "../slice/weatherMapSlice";

const rootReducer = combineReducers({
  weather: weatherSlice,
  weatherMap: weatherMapSlice,
  locations: locationsSlice,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const makeStore = (
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(weatherApi.middleware),
  });
};
export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(weatherApi.middleware),
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

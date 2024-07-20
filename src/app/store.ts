import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
  PreloadedStateShapeFromReducersMapObject,
} from "@reduxjs/toolkit";
//import type { PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";

import weatherSlice from "../features/weatherSlice";
import { weatherApi } from "../services/weatherApi";

const rootReducer = combineReducers({
  weather: weatherSlice,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

//export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
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

///////////////

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (gDM) => gDM().concat(weatherApi.middleware),
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

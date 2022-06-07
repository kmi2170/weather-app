import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import weatherSlice from '../features/weatherSlice';
import { weatherApi } from '../services/weatherApi';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: gDM => gDM().concat(weatherApi.middleware),
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

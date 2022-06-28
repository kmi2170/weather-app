import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import weatherSlice from '../features/weatherSlice';
import { weatherApi } from '../services/weatherApi';

const rootReducer = combineReducers({
  weather: weatherSlice,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gDM) => gDM().concat(weatherApi.middleware),
  });
};

setupListeners(setupStore().dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (gDM) => gDM().concat(weatherApi.middleware),
// });
// setupListeners(store.dispatch);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Weather, WeatherQuery } from '../api/types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  // keepUnusedDataFor: 30,
  // refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getWeather: builder.query<Weather, WeatherQuery>({
      query: ({ lat, lon, units, lang }) => {
        return `weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`;
      },
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Weather,
  WeatherHistoryQuery,
  WeatherHistoryResponse,
  WeatherQuery,
} from "../api/types/weather";
import { WeatherMapQuery, WeatherMapResponse } from "../api/types/map";
import { CustomResponse } from "../api/types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api",
    // typeof window === "undefined"
    //   ? "http://localhost:3000"
    //   : window.location.origin,
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  // keepUnusedDataFor: 30,
  // refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({
    getWeather: builder.query<Weather, WeatherQuery>({
      query: ({ lat, lon, units, lang }) => {
        return `weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`;
      },
    }),
    getWeatherMap: builder.query<
      CustomResponse<WeatherMapResponse>[],
      WeatherMapQuery
    >({
      query: ({ lat, lon, zoom, layer }) => {
        return `weather-map?layer=${layer}&lat=${lat}&lon=${lon}&zoom=${zoom}`;
      },
    }),
    getWeatherHistory: builder.query<
      WeatherHistoryResponse,
      WeatherHistoryQuery
    >({
      query: ({ lat, lon, date, tz, units, lang }) => {
        return `weather-history?&lat=${lat}&lon=${lon}&date=${date}&tz=${tz}&units=${units}&lang=${lang}`;
      },
    }),
  }),
});

export const {
  useGetWeatherQuery,
  useGetWeatherMapQuery,
  useGetWeatherHistoryQuery,
} = weatherApi;

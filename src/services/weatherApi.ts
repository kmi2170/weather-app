import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Weather, WeatherQuery } from "../api/types/weather";
import { WeatherMapQuery } from "../api/types/weatherMap";

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
    getWeather: builder.query<Weather | string, WeatherQuery>({
      query: ({ lat, lon, units, lang }) => {
        return `weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`;
      },
    }),
    getWeatherMap: builder.query<string, WeatherMapQuery>({
      query: ({ lat, lon, zoom, layer }) => {
        return `weathermap?layer=${layer}&lat=${lat}&lon=${lon}&zoom=${zoom}`;
      },
    }),
  }),
});

export const { useGetWeatherQuery, useGetWeatherMapQuery } = weatherApi;

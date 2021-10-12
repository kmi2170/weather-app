import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherOnecallApi = createApi({
  reducerPath: "weatherOnecallApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  /* refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true, */
  endpoints: (builder) => ({
    getWeatherOnecall: builder.query({
      query: ({ lat, lon, units, lang }) =>
        `onecall?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`,
    }),
  }),
});

export const { useGetWeatherOnecallQuery } = weatherOnecallApi;

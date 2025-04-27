"use client";

import { useEffect, useRef } from "react";
import { useGetWeatherQuery } from "../services/weatherApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useCustomCookies } from "./useCustomCookies";
import { isLocationValid } from "../utils/cookiesValidator";
import { setLocation } from "../slice/weatherSlice";
import { asyncThunkIpLookupLocation } from "../slice/weatherAsyncThunk";
import { Location } from "../store/initialState";

export const useLocation = () => {
  const dispatch = useAppDispatch();

  const { units, lang, location } = useAppSelector((state) => state.weather);

  const { cookies, setLocationCookie } = useCustomCookies();

  const latRef = useRef<number | null>(location.lat);
  const lonRef = useRef<number | null>(location.lon);

  if (latRef.current == null || lonRef.current == null) {
    if (isLocationValid(cookies.weather_location)) {
      dispatch(setLocation(cookies.weather_location as Location));
      latRef.current = cookies.weather_location?.lat;
      lonRef.current = cookies.weather_location?.lon;
    }
  }

  if (latRef.current == null || lonRef.current == null) {
    dispatch(asyncThunkIpLookupLocation())
      .then((res) => {
        const { lat, lon } = res.payload as Location;
        latRef.current = lat;
        lonRef.current = lon;
      })
      .catch((error) => console.error(error));
    // (async () => {
    //   try {
    //     const res = await ipLookup();
    //     dispatch(setLocation(res as Location));
    //     latRef.current = res.lat;
    //     lonRef.current = res.lon;
    //   } catch (error) {
    //     console.error("failed to fetch ip location");
    //   }
    // })();
  }

  // default location
  if (latRef.current == null || lonRef.current == null) {
    dispatch(
      setLocation({
        city: "Tokyo",
        region: "Tokyo",
        country: "Japan",
        lat: 35.69,
        lon: 139.692,
      })
    );
    latRef.current = 35.69;
    lonRef.current = 139.692;
  }

  const { isLoading, isError } = useGetWeatherQuery({
    lat: String(location.lat ?? latRef.current),
    lon: String(location.lon ?? lonRef.current),
    units,
    lang,
  });

  useEffect(() => {
    if (isLocationValid(location)) {
      setLocationCookie(location);
    }
  }, [location]);

  return { isLoading, isError };
};

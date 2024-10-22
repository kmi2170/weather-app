"use client";

import { useGetWeatherMapQuery } from "../../services/weatherApi";
import { useAppSelector } from "../../store/hooks";

const WeatherMap = () => {
  const { location } = useAppSelector((state) => state.weather);

  const { data, isLoading, isError } = useGetWeatherMapQuery({
    lat: String(location.lat),
    lon: String(location.lon),
  });
  console.log(data);
  return <div>Map</div>;
};

export default WeatherMap;

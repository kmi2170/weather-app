import axios from "axios";
import { WeatherQuery, Weather, Geocoding } from "../types";

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchWeather = async ({
  lat,
  lon,
  units,
  lang,
}: WeatherQuery): Promise<Weather | string> => {
  const url = `https://api.openweathermap.org/data/3.0/onecall`;
  try {
    const { data } = await axios.get<Weather>(url, {
      params: { lat, lon, units, lang, appid },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const fetchGeocodingByLocationName = async (
  q: string
): Promise<Geocoding[] | string> => {
  const url = "https://api.openweathermap.org/geo/1.0/direct";
  try {
    const { data } = await axios.get<Geocoding[]>(url, {
      params: { q, appid },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

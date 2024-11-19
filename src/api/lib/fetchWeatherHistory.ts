import axios from "axios";
import { WeatherHistoryQuery, WeatherHistoryResponse } from "../types/weather";

const appid = process.env.OPEN_WEATHER_KEY;

export const fetchWeatherHistory = async ({
  lat,
  lon,
  date,
  tz,
  units,
  lang,
}: WeatherHistoryQuery): Promise<WeatherHistoryResponse | string> => {
  try {
    const url = "https://api.openweathermap.org/data/3.0/onecall/day_summary";
    const { data } = await axios.get<WeatherHistoryResponse>(url, {
      params: { lat, lon, date, units, lang, appid },
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

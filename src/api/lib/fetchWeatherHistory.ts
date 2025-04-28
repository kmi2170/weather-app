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
}: WeatherHistoryQuery): Promise<WeatherHistoryResponse> => {
  try {
    const url = "https://api.openweathermap.org/data/3.0/onecall/day_summary";
    const { data } = await axios.get<WeatherHistoryResponse>(url, {
      params: { lat, lon, date, units, lang, appid },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

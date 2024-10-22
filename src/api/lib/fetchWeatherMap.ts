import axios from "axios";
import { WeatherQuery, Weather } from "../types";

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchWeatherMap = async ({
  lat,
  lon,
}: WeatherQuery): Promise<Weather | string> => {
  try {
    const zoom = 1;
    const mapLayer = "TA2";
    // const url = `https://maps.openweathermap.org/maps/2.0/weather/1h/TA2/1/1/1`;
    // const url = `https://maps.openweathermap.org/maps/2.0/weather/1h/${mapLayer}/${zoom}/${lat}/${lon}`;

    // const url = "https://tile.openweathermap.org/map/clounds_new/1/1/1.png"

    const url = "https://tile.openweathermap.org/map/clouds_new/1/1/1.png";

    const date = Math.floor(Date.now() / 1000);
    console.log(url, date, appid);

    // const { data } = await axios.get<Weather>(url);
    const { data } = await axios.get<Weather>(url, {
      params: { appid },
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

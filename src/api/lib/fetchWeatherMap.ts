import axios from "axios";
import { WeatherMapQuery } from "../types/weatherMap";

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_KEY;

export const fetchWeatherMap = async ({
  lat,
  lon,
  zoom,
  layer,
}: WeatherMapQuery): Promise<string> => {
  try {
    const url = `https://tile.openweathermap.org/map/${layer}/${zoom}/1/1.png`;

    const { data } = await axios.get(url, {
      params: { appid },
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(data, "binary").toString("base64");

    return "data:image/png;base64," + base64Image;
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

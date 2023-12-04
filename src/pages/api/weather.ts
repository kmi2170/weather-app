import { NextApiRequest, NextApiResponse } from "next";
import { fetchWeather } from "../../api/lib/fetchWeather";
import { WeatherQuery } from "../../api/types";

export default async function weather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchWeather(req.query as WeatherQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

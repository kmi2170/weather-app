import { NextApiRequest, NextApiResponse } from "next";
import { fetchOpenWeatherOnecall } from "../../api/lib/fetchOpenWeather";

export default async function onecall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lat, lon, units, lang } = req.query;

    const data = await fetchOpenWeatherOnecall(
      lat as string,
      lon as string,
      units as string,
      lang as string
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

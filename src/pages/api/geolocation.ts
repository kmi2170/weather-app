import { NextApiRequest, NextApiResponse } from "next";
import { fetchOpenGeocodingByLocationName } from "../../api/lib/fetchOpenWeather";

export default async function onecall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { q } = req.query;

    const data = await fetchOpenGeocodingByLocationName(q as string);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
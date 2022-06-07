import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWeather } from '../../api/lib/fetchWeather';

export default async function weather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lat, lon, units, lang } = req.query;
    const data = await fetchWeather(
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

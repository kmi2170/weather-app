import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGeocodingByLocationName } from '../../api/lib/fetchWeather';

export default async function geolocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { q } = req.query;
    const data = await fetchGeocodingByLocationName(q as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

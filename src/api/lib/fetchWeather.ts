import axios from 'axios';
import { Weather } from '../../features/initialState';

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchWeather = async (
  lat: string,
  lon: string,
  units: string,
  lang: string
): Promise<Weather> => {
  const url = `https://api.openweathermap.org/data/2.5/onecall`;
  if ((+lat || +lat === 0.0) && (+lon || +lon === 0.0)) {
    try {
      const { data } = await axios.get(url, {
        params: { lat, lon, units, lang, appid },
      });

      return data as Weather;
    } catch (error) {
      console.error(error);
    }
  } else {
    return null;
  }
};

export const fetchGeocodingByLocationName = async (q: string): Promise<any> => {
  const url = 'https://api.openweathermap.org/geo/1.0/direct';
  try {
    const { data } = await axios.get(url, { params: { q, appid } });

    return data;
  } catch (error) {
    console.error(error);
  }
};

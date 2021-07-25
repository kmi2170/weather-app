import axios from 'axios';
import { QueryType } from '../api/type_settings';

// const baseUrl = 'https://api.openweathermap.org/data/2.5';

const api_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchOpenWeatherOnecall = async (
  lat: number,
  lon: number,
  q: QueryType
) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall`;

  try {
    const { data } = await axios.get(url, {
      params: {
        lat,
        lon,
        units: q.units,
        lang: q.lang,
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOpenWeatherCurrentByCoordinates = async (
  lat: number,
  lon: number,
  q: QueryType
) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const { data } = await axios.get(url, {
      params: {
        lat,
        lon,
        units: q.units,
        lang: q.lang,
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOpenWeatherCurrentByCityName = async (q: QueryType) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const { data } = await axios.get(url, {
      params: {
        q: `${q.city},${q.state}`,
        units: q.units,
        lang: q.lang,
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

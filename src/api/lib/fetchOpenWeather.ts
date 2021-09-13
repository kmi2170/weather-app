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
        units: q.units || 'imperial',
        lang: q.lang || 'en',
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

export const fetchOpenWeatherCurrentByCityName = async (
  city: string,
  state: string,
  country: string,
  units: string,
  lang: string
) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const { data } = await axios.get(url, {
      params: {
        q: state ? `${city},${state},${country}` : `${city},${country}`,
        units,
        lang,
        appid: api_key,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOpenGeocodingByLocationName = async (q: string) => {
  const url = 'https://api.openweathermap.org/geo/1.0/direct';

  try {
    const { data } = await axios.get(url, { params: { q, appid: api_key } });
    console.log('geolocation', data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

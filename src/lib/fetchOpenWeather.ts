import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5';

const key = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchOpenWeatherOnecall = async (lat: number, lon: number) => {
  const url = `${baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${key}`;

  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOpenWeatherCurrentByCoordinates = async (
  lat: number,
  lon: number
) => {
  const url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOpenWeatherCurrentByCityName = async (
  city: string,
  state?: string
) => {
  const url = state
    ? `${baseUrl}/weather?q=${city},${state}&appid=${key}`
    : `${baseUrl}/weather?q=${city}&appid=${key}`;

  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};

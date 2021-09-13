import axios from 'axios';
// const url =
//   'https://api.weatherapi.com/v1/current.json?key=fe70157311594d36b81212236212107&q=98597';
//
const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchWeatherAPILocation = async (lat: number, lon: number) => {
  const url = 'https://api.weatherapi.com/v1/current.json';

  try {
    const { data } = await axios.get(url, {
      params: { q: `${lat},${lon}`, key },
    });

    return data;
  } catch (error) {
    console.error();
  }
};

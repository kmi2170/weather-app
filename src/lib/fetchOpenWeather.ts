import axios from 'axios';

const key = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
//const key = '4ab047dc61633bb144b22858715eba92';

const fetchOpenWeather = async (lat: number, lon: number) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;

  try {
    const { data } = await axios(url);

    console.log('fetchOpenWeather', data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchOpenWeather;

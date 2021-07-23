import axios from 'axios';
// const url =
//   'https://api.weatherapi.com/v1/current.json?key=fe70157311594d36b81212236212107&q=98597';
//
const baseUrl = 'https://api.weatherapi.com/v1/';
const weatherapi_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const url = `https://api.weatherapi.com/v1/ip.json?key=${weatherapi_key}&q=auto:ip`;

const fetcher = async (url: string) => {
  try {
    const { data } = await axios(url);
    // console.log(data);
    return { data, error: null };
  } catch (error) {
    console.error();
    return { data: null, error };
  }
};

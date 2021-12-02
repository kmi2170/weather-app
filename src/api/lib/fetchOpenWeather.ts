import axios from "axios";

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const fetchOpenWeatherOnecall = async (
  lat: string,
  lon: string,
  units: string,
  lang: string
) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall`;

  if ((+lat || +lat === 0.0) && (+lon || +lon === 0.0)) {
    try {
      const { data } = await axios.get(url, {
        params: { lat, lon, units, lang, appid },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  } else {
    return null;
  }
};

export const fetchOpenGeocodingByLocationName = async (q: string) => {
  const url = "https://api.openweathermap.org/geo/1.0/direct";

  try {
    const { data } = await axios.get(url, { params: { q, appid } });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

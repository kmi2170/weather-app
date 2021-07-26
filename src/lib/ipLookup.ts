import axios from 'axios';

const ipLookup = async () => {
  const url = 'https://ipapi.co/json';

  try {
    const { data } = await axios(url);

    const {
      city,
      region,
      country_name,
      country_code_iso3,
      timezone,
      latitude,
      longitude,
      postal,
    } = data;

    return {
      city,
      region,
      country_name,
      country_code: country_code_iso3,
      timezone,
      lat: latitude,
      lon: longitude,
      postal,
    };
  } catch (error) {
    console.log(error);
  }
};

export default ipLookup;

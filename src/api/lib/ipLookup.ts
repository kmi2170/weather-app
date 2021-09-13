import axios from 'axios';

export const ipLookup = async () => {
  const url = 'https://ipapi.co/json';

  try {
    const { data } = await axios(url);

    const {
      city,
      region,
      country_name,
      latitude,
      longitude,
      // country_code_iso3,
      // timezone,
      // postal,
    } = data;

    return {
      city,
      region,
      lat: latitude,
      lon: longitude,
      country: country_name,
      // country_code: country_code_iso3,
      // timezone,
      // postal,
    };
  } catch (error) {
    console.log(error);
  }
};

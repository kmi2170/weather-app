import axios from "axios";

const url = "https://ipapi.co/json";

export const ipLookup = async () => {
  try {
    const { data } = await axios(url);
    console.log(data);

    const {
      city,
      latitude: lat,
      longitude: lon,
      region_code: state,
      country_code: country,
      /* region: state,
      country_name: country, */
    } = data;

    return { city, state: state || "", country, lat, lon };
  } catch (error) {
    console.log(error);
  }
};

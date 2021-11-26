import axios from "axios";

const url = "https://ipapi.co/json";

export const ipLookup = async () => {
  try {
    const { data } = await axios(url);

    const {
      city,
      region: state,
      country_name: country,
      latitude: lat,
      longitude: lon,
    } = data;

    return { city, state: state || "", country, lat, lon };
  } catch (error) {
    console.log(error);
  }
};

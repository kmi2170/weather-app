import axios from "axios";
import { Location } from "../../features/initialState";

type IpType = {
  city: string;
  latitude: number;
  longitude: number;
  region_code: string;
  country_code: string;
};

const url = "https://ipapi.co/json";
export const ipLookup = async (): Promise<Location | undefined> => {
  try {
    const { data } = await axios.get<IpType>(url);
    console.log(data);
    const {
      city,
      latitude: lat,
      longitude: lon,
      region_code: region,
      country_code: country,
    } = data;

    return { city, region: region || "", country, lat, lon };
  } catch (error) {
    console.error(error);
  }
};

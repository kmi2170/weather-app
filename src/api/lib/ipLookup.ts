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
export const ipLookup = async (): Promise<Location | string> => {
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
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

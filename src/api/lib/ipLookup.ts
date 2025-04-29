import axios from "axios";
import { Location } from "../../store/initialState";

type IpType = {
  city: string;
  latitude: number;
  longitude: number;
  region_code: string;
  country_code: string;
};

const url = "https://ipapi.co/json";
export const ipLookup = async (): Promise<Location> => {
  try {
    const { data } = await axios.get<IpType>(url);
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
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

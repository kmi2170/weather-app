import axios from "axios";
import { LocationType } from "../types";

const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";

const defaultSearchParamsObj = {
  count: "10",
  language: "en",
  format: "json",
};
const searchParams = new URLSearchParams(defaultSearchParamsObj);

export async function findLocations(
  locationName: string
): Promise<LocationType[] | string> {
  try {
    searchParams.set("name", locationName);
    const url = `${baseUrl}?${searchParams}`;
    const { data } = await axios.get(url, {
      params: { name: locationName },
    });
    const results = data?.results;
    return results as LocationType[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

import axios from "axios";
import { LocationType } from "../types/weather";
import { SignalWifi1BarLock } from "@mui/icons-material";

const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";

const defaultSearchParamsObj = {
  count: "10",
  language: "en",
  format: "json",
};
const searchParams = new URLSearchParams(defaultSearchParamsObj);

export async function findLocations(
  locationName: string,
  signal: AbortSignal
): Promise<LocationType[]> {
  try {
    searchParams.set("name", locationName);
    const url = `${baseUrl}?${searchParams}`;
    const { data } = await axios.get(url, {
      params: { name: locationName },
      signal,
    });
    const results = data?.results;
    return results as LocationType[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

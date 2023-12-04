import { Weather } from "../api/types";

export type Location = {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
};

export type Units = "imperial" | "metric";
export type Lang = "en" | "ja";

export const initialState: StateType = {
  location: {
    city: "",
    region: "",
    country: "",
    lat: null,
    lon: null,
  },
  units: "imperial",
  lang: "en",
  weather: null,
  selectedPageId: 1,
  isLoading: false,
  isError: false,
  isNotFound: false,
};

export type StateType = {
  location: Location;
  units: Units;
  lang: Lang;
  weather: Weather;
  selectedPageId: number;
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
};

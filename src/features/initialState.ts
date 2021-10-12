export type IpLocation = {
  city?: string;
  state?: string;
  country?: string;
  lat?: string;
  lon?: string;
};

export type Location = {
  city?: string;
  state?: string;
  country?: string;
  lat?: string;
  lon?: string;
};

export type Units = "imperial" | "metric";
export type Lang = "en" | "ja";

export type WeatherCurrent = null | any;
export type WeatherOneCall = null | any;

export const initialState: StateType = {
  ipLocation: {
    city: "",
    state: "",
    country: "",
    lat: null,
    lon: null,
  },
  location: {
    city: "",
    state: "",
    country: "",
    lat: null,
    lon: null,
  },
  units: "imperial",
  lang: "en",
  weatherCurrent: null,
  weatherOnecall: null,
  selectedPageId: 1,
  isLoading: false,
  isError: false,
};

export type StateType = {
  ipLocation: IpLocation;
  location: Location;
  units: Units;
  lang: Lang;
  weatherCurrent: WeatherCurrent;
  weatherOnecall: WeatherCurrent;
  selectedPageId: number;
  isLoading: boolean;
  isError: boolean;
};

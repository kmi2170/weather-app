export type Location = {
  city: string;
  region: string;
  country: string;
  lat: string;
  lon: string;
};

export type Units = 'imperial' | 'metric';
export type Lang = 'en' | 'ja';

export type Weather = null | any;

export const initialState: StateType = {
  location: {
    city: '',
    region: '',
    country: '',
    lat: null,
    lon: null,
  },
  units: 'imperial',
  lang: 'en',
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
  isNotFound: Boolean;
};

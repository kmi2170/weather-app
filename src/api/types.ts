import { Units } from '../features/initialState';

export type CookieLocation = Record<string, string> | null | undefined;

export interface ChartProps {
  chartData: WeatherHourly;
  dataTime: string[];
  units?: Units;
}

export type WeatherQuery = {
  lat: string;
  lon: string;
  units: string;
  lang: string;
};

export type WeatherSummary = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherCurrent = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherSummary[];
  rain?: {
    '1h'?: number;
  };
  snow?: {
    '1h'?: number;
  };
};

export type WeatherMinutely = {
  dt: number;
  precipitation: number;
}[];

export type WeatherHourly = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  rain?: {
    '1h'?: number;
  };
  snow?: {
    '1h'?: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
}[];

export type WeatherDaily = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
};

export type Alerts = {
  sender_name: number;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}[];

export type Weather = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherCurrent;
  minutely: WeatherMinutely;
  hourly: WeatherHourly;
  daily: WeatherDaily[];
  alerts: Alerts;
};

export type Geocoding = {
  name: string;
  local_names: {
    en: string;
    ja: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

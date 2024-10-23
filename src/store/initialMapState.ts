import { Weather } from "../api/types/weather";

// export type Location = {
//   city: string;
//   region: string;
//   country: string;
//   lat: number | null;
//   lon: number | null;
// };

// export type Units = "imperial" | "metric";
// export type Lang = "en" | "ja";

export const initialMapState: MapStateType = {
  map: {},
};

export type MapStateType = {
  map: any;
};

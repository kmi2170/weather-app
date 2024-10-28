export const layers = [
  { id: "temp_new", name: "temperature" },
  { id: "precipitation_new", name: "precipitation" },
  { id: "clouds_new", name: "clouds" },
  { id: "wind_new", name: "wind" },
  { id: "pressure_new", name: "pressure" },
] as const;

export type WeatherMapLayerNames = (typeof layers)[number]["name"];
export type WeatherMapLayerKeys = (typeof layers)[number]["id"];

export type WeatherMapQuery = {
  lat: number;
  lon: number;
  zoom: number;
  layer: WeatherMapLayerKeys;
};

export type WeatherMapResponse = {
  bounds: BoundsType;
  img: string;
  tileCoords: TileCoords;
};

export type TileCoords = [number, number];

export type BoundsType = [[number, number], [number, number]];

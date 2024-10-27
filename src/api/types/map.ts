export const layers = [
  { id: "temp_new", name: "Temperature" },
  { id: "precipitation_new", name: "Precipitation" },
  { id: "clouds_new", name: "Clouds" },
  { id: "wind_new", name: "Wind Speed" },
  { id: "pressure_new", name: "Sea Level Pressure" },
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

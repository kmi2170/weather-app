export const layers = [
  { id: "temp_new", name: "Temperature" },
  { id: "precipitation_new", name: "Precipitation" },
  { id: "clouds_new", name: "Clouds" },
  { id: "wind_new", name: "Wind Speed" },
  { id: "pressure_new", name: "Sea Level Pressure" },
] as const;

export type WeatherMapLayerNames = (typeof layers)[number]["name"];
export type WeatherMapLayerIds = (typeof layers)[number]["id"];

export type WeatherMapQuery = {
  x: string;
  y: string;
  zoom: string;
  layer: WeatherMapLayerIds;
};

export type WeatherMapLayer = "clouds_new" | "temp_new";

export type WeatherMapQuery = {
  lat: string;
  lon: string;
  zoom: string;
  layer: WeatherMapLayer;
};

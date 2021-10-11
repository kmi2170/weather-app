export type QueryType = {
  city: string;
  state?: string;
  units?: "imperial|metric";
  lang?: "en|ja";
};

export type CookieNameType = "myweather_coordinates" | "myweather_units";

export type LocationType = {
  city: string;
  region: string;
  postal: string;
  country_code: string;
  lat: number;
  lon: number;
};

export type QueryType = {
  city: string;
  state?: string;
  units?: 'imperial|metric';
  lang?: 'en|ja';
};

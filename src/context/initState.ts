export const initState = {
  ipLocation: {
    city: '',
    state: '',
    country: '',
    lat: null,
    lon: null,
  },
  location: {
    city: '',
    state: '',
    country: '',
    lat: null,
    lon: null,
  },
  units: 'imperial',
  lang: 'en',
  weatherCurrent: null,
  weatherOnecall: null,
  selectedPageId: 1,
};

export type StateType = {
  ipLocation: {
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lon?: number;
  };
  location: {
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lon?: number;
  };
  units: string;
  lang: string;
  // units: 'imperial' | 'metric' | 'standard';
  // lang: 'en' | 'ja';
  weatherCurrent: any;
  weatherOnecall: any;
  selectedPageId: number;
};

export enum actionTypes {
  SET_IP_LOCATION = 'SET_IP_LOCATION',
  SET_LOCATION = 'SET_LOCATION',
  SET_LANG = 'SET_LANG',
  SET_UNITS = 'SET_UNITS',
  SET_WEATHER_CURRENT = 'SET_WEATHER_CURRENT',
  SET_WEATHER_ONECALL = 'SET_WEATHER_ONECALL',
  SET_SELECTED_PAGE_ID = 'SET_SELECTED_PAGE_ID',
}

type PayloadType = {
  [actionTypes.SET_IP_LOCATION]: {
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lon?: number;
  };
  [actionTypes.SET_LOCATION]: {
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lon?: number;
  };
  [actionTypes.SET_LANG]: string;
  [actionTypes.SET_UNITS]: string;
  [actionTypes.SET_WEATHER_CURRENT]: {};
  [actionTypes.SET_WEATHER_ONECALL]: {};
  [actionTypes.SET_SELECTED_PAGE_ID]: number;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export type ActionsType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

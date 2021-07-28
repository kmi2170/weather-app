import { createContext, useReducer, useMemo } from 'react';

const initialState = {
  location: {
    city: '',
    state: '',
    country_name: '',
    timezone: '',
  },
  units: 'imperial',
  lang: 'en',
  weatherCurrent: null,
  weatherOnecall: null,
};

type StateType = {
  location: {
    city: string;
    state: string;
    country_name: string;
    timezone: string;
  };
  units: string;
  lang: string;
  // units: 'imperial' | 'metric' | 'standard';
  // lang: 'en' | 'ja';
  weatherCurrent: any;
  weatherOnecall: any;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum actionTypes {
  SET_LOCATION = 'SET_LOCATION',
  SET_LANG = 'SET_LANG',
  SET_UNITS = 'SET_UNITS',
  SET_WEATHER_CURRENT = 'SET_WEATHER_CURRENT',
  SET_WEATHER_ONECALL = 'SET_WEATHER_ONECALL',
}

type PayloadType = {
  [actionTypes.SET_LOCATION]: {
    city: string;
    state: string;
    country_name: string;
    timezone: string;
  };
  [actionTypes.SET_LANG]: string;
  [actionTypes.SET_UNITS]: string;
  [actionTypes.SET_WEATHER_CURRENT]: {};
  [actionTypes.SET_WEATHER_ONECALL]: {};
};

export type ActionsType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

export const WeatherContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionsType>;
}>({ state: initialState, dispatch: () => null });

export const reducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return { ...state, location: action.payload };
    case actionTypes.SET_UNITS:
      return { ...state, units: action.payload };
    case actionTypes.SET_LANG:
      return { ...state, lang: action.payload };
    case actionTypes.SET_WEATHER_CURRENT:
      return { ...state, weatherCurrent: action.payload };
    case actionTypes.SET_WEATHER_ONECALL:
      return { ...state, weatherOnecall: action.payload };
    default:
      return state;
  }
};

const WeatherContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;

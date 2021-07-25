import { createContext, useReducer, useMemo } from 'react';

const initialState = {
  city: '',
  state: '',
  lat: '',
  lon: '',
  units: 'imperial',
  lang: 'en',
  weatherCurrent: null,
  weatherOnecall: null,
};

type StateType = {
  city: string;
  state: string;
  lat: string;
  lon: string;
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
  SET_LANG = 'SET_LANG',
  SET_UNITS = 'SET_UNITS',
}

type PayloadType = {
  [actionTypes.SET_LANG]: string;
  [actionTypes.SET_UNITS]: string;
};

export type ActionsType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

export const WeatherContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionsType>;
}>({ state: initialState, dispatch: () => null });

export const reducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case actionTypes.SET_UNITS:
      console.log('action units', action.payload);
      return { ...state, units: action.payload };
    case actionTypes.SET_LANG:
      console.log('action lnag', action.payload);
      return { ...state, lang: action.payload };
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

import { createContext, useReducer, useMemo } from 'react';
import { initState, StateType } from './initState';
import { ActionsType } from './actionTypes';
import reducer from './reducer';

export const WeatherContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionsType>;
}>({ state: initState, dispatch: () => null });

const WeatherContextContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextContextProvider;

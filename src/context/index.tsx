import { createContext, useMemo } from 'react';
import { useReducer } from 'react';
import { initState, StateType } from './initState';
import useAsyncReducer from '../hooks/useAsyncReducer';
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
  // const [state, dispatch] = useAsyncReducer(reducer, initState);

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

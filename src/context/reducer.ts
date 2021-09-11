import { StateType } from './initState';
import { actionTypes, ActionsType } from './actionTypes';

export const reducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case actionTypes.SET_IP_LOCATION:
      return { ...state, ipLocation: action.payload };
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
    case actionTypes.SET_SELECTED_PAGE_ID:
      return { ...state, selectedPageId: action.payload };
    default:
      return state;
  }
};

export default reducer;

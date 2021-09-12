import { actionTypes, ActionsType } from './actionTypes';

// const findPlace = (dataLocationName: any) => (
//   dispatch: React.Dispatch<ActionsType>
// ) =>
const findPlaceFunc = (
  dispatch: React.Dispatch<ActionsType>,
  dataLocationName: any
) =>
  dispatch({
    type: actionTypes.SET_LOCATION,
    payload: {
      city: dataLocationName?.location.name as string,
      state: dataLocationName?.location.region as string,
      country: dataLocationName?.location.country as string,
    },
  });

function createActions(dispatch: React.Dispatch<ActionsType>) {
  return {
    findPlace: (dataLocationName: any) =>
      findPlaceFunc(dispatch, dataLocationName),
    // up: () => dispatch({ type: 'up' }),
    // down: () => dispatch({ type: 'down' }),
    // reset: () => dispatch({ type: 'reset' }),
  };
}
export default createActions;

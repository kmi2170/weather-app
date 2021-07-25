import { useState, useEffect, useContext } from 'react';

import { WeatherContext, actionTypes } from '../reducer/reducer';

import { Typography, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Component: React.FC = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(WeatherContext);

  const handleClickLang = () =>
    dispatch({
      type: actionTypes.SET_LANG,
      payload: state.lang === 'en' ? 'ja' : 'en',
    });

  const handleClickUnits = () =>
    dispatch({
      type: actionTypes.SET_UNITS,
      payload: state.units === 'imperial' ? 'metric' : 'imperial',
    });

  return (
    <>
      <Button variant="outlined" onClick={handleClickLang}>
        {state.lang === 'en' ? <span>Japanese</span> : <span>English</span>}
      </Button>
      <Button variant="outlined" size="small" onClick={handleClickUnits}>
        {state.units === 'imperial' ? (
          <span>&#8457;</span>
        ) : (
          <span>&#8451;</span>
        )}
      </Button>
    </>
  );
};

export default Component;

import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { WeatherContext, actionTypes } from '../reducer/reducer';

import { Typography, Button, Tooltip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Component: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const handleClickLang = () => {
    const lang = state.lang === 'en' ? 'ja' : 'en';

    router.push({ pathname: '/', query: { ...query, lang } });

    return dispatch({
      type: actionTypes.SET_LANG,
      payload: lang,
    });
  };

  const handleClickUnits = () => {
    const units = state.units === 'imperial' ? 'metric' : 'imperial';

    router.push({ pathname: '/', query: { ...query, units } });

    return dispatch({
      type: actionTypes.SET_UNITS,
      payload: units,
    });
  };

  const buttonLang = () =>
    state.lang === 'en' ? <span>Japanese</span> : <span>English</span>;

  const buttonUnits = () =>
    state.units === 'imperial' ? <span>&#8457;</span> : <span>&#8451;</span>;

  const buttonUnitsTooltip = () =>
    state.units !== 'imperial' ? (
      <span>Switch to &#8457;</span>
    ) : (
      <span>Switch to &#8451;</span>
    );

  const buttonLangTooltip = () =>
    state.lang !== 'en' ? (
      <span>Switch to Japanese</span>
    ) : (
      <span>Switch to English</span>
    );

  return (
    <>
      <Tooltip title={buttonUnitsTooltip()}>
        <Button variant="outlined" size="small" onClick={handleClickUnits}>
          {buttonUnits()}
        </Button>
      </Tooltip>
      {/* 
      <Tooltip title={buttonLangTooltip()}>
        <Button variant="outlined" size="small" onClick={handleClickLang}>
          {buttonLang()}
        </Button>
      </Tooltip>
      */}
    </>
  );
};

export default Component;

import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { WeatherContext, actionTypes } from '../reducer/reducer';
import Layout from '../components/Layout';
import OpenWeatherOnecall_Current from '../components/OpenWeather/OpenWeatherOnecall_Current';
import OpenWeatherOnecall_Daily from '../components/OpenWeather/OpenWeatherOnecall_Daily';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Weather: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  return (
    <Grid container spacing={0}>
      {/* 
          <Grid item xs={12}>
            {state.weatherCurrent && <OpenWeatherCurrent />}
          </Grid>
        */}

      <Grid item xs={12}>
        {state.weatherOnecall && <OpenWeatherOnecall_Current />}
      </Grid>
      <Grid item xs={12}>
        {state.weatherOnecall && <OpenWeatherOnecall_Daily />}
      </Grid>
    </Grid>
  );
};

export default Weather;

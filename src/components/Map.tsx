import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { WeatherContext, actionTypes } from '../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Map: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const { minutely } = state.weatherOnecall;

  const data_time = minutely.map((el) => el.dt);
  const data_precip = minutely.map((el) => el.precipiation);

  const config = {
    type: 'bar',
    data: data_precip,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      title: {
        display: true,
        text: 'Minute forecast for 1 hour',
        fontSiz: 20,
      },
      legend: {
        disply: true,
        position: 'right',
      },
    },
  };

  return (
    <Typography variant="h5" className={classes.text}>
      Map
    </Typography>
  );
};

export default Map;

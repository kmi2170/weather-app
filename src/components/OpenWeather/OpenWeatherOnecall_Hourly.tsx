// import { useState, useEffect, useContext } from 'react';
// import router, { useRouter } from 'next/router';

import { Typography, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ChartTemps from './Charts/ChartTemps';
import ChartHumidity from './Charts/ChartHumidity';
import ChartPrecipitation from './Charts/ChartPrecipitation';
import ChartWind from './Charts/ChartWind';
import ChartPressure from './Charts/ChartPressure';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: '1rem',
  },
}));

const OpenWeatherOnecall_Hourly: React.FC = () => {
  const classes = useStyles();

  // const { query } = useRouter();
  // const { state, dispatch } = useContext(WeatherContext);

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Hourly
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" align="center" className={classes.text}>
          Hourly Fourcast for 48 Hours
        </Typography>
        <div>
          <ChartTemps />
        </div>
        <div>
          <ChartHumidity />
        </div>
        <div>
          <ChartPrecipitation />
        </div>
        <div>
          <ChartWind />
        </div>
        {/* 
        <div>
          <ChartPressure />
        </div>
        */}
      </Paper>
    </>
  );
};

export default OpenWeatherOnecall_Hourly;

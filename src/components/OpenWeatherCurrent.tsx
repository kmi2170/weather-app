import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Preview from './Preview';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const OpenWeatherCurrent: React.FC<any> = ({ weatherCurrent }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" className={classes.text}>
        CurrentOpenWeather
      </Typography>
      <Preview data={weatherCurrent} />
    </>
  );
};

export default OpenWeatherCurrent;

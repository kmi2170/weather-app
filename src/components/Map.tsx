import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

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

  return (
    <Typography variant="h5" className={classes.text}>
      Map
    </Typography>
  );
};

export default Map;

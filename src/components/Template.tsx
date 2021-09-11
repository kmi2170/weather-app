import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { WeatherContext } from '../context';
import { actionTypes } from '../context/actionTypes';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Component: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  return (
    <div>
      <Typography variant="h5" className={classes.text}>
        component
      </Typography>
    </div>
  );
};

export default Component;

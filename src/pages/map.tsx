import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { WeatherContext, actionTypes } from '../reducer/reducer';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Map: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  return (
    <Layout>
      <Typography variant="h5" className={classes.text}>
        Map
      </Typography>
    </Layout>
  );
};

export default Map;

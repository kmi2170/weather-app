import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { GetServerSideProps } from 'next';

import { WeatherContext, actionTypes } from '../reducer/reducer';
import OpenWeatherCurrent from '../components/OpenWeather/OpenWeatherCurrent';
import OpenWeatherOnecall_Current from '../components/OpenWeather/OpenWeatherOnecall_Current';
import SEO from '../components/SEO';
import Buttons from '../components/Buttons';
import Footer from '../components/Footer';
import Preview from '../components/Preview';

import ipLookup from '../lib/ipLookup';
import {
  fetchOpenWeatherCurrentByCoordinates,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
} from '../lib/fetchOpenWeather';

import { LocationType } from '../api/type_settings';
import { QueryType } from '../api/type_settings';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage:
      'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
    height: '100vh',
  },
}));

const Home: React.FC<any> = ({ dataCurrent, dataOnecall }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(WeatherContext);
  const { query } = useRouter();

  useEffect(() => {
    const getLocation = async () => {
      const res = await ipLookup();

      const { city, region, country_name, timezone } = res;

      dispatch({
        type: actionTypes.SET_LOCATION,
        payload: {
          city: city as string,
          state: region as string,
          country_name: country_name as string,
          timezone: timezone as string,
        },
      });

      router.push({
        pathname: '/',
        query: { city, state: region, units: state.units, lang: state.lang },
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_WEATHER_CURRENT, payload: dataCurrent });
  }, [dataCurrent, dispatch]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_WEATHER_ONECALL, payload: dataOnecall });
  }, [dataOnecall, dispatch]);

  return (
    <div className={classes.root}>
      <SEO />
      <Container>
        <Typography variant="h3" component="h1">
          Weather App
        </Typography>
        <Buttons />
        <Grid container spacing={0}>
          {/* 
          <Grid item xs={12}>
            {state.weatherCurrent && <OpenWeatherCurrent />}
          </Grid>
            {state.weatherOnecall && <OpenWeatherOnecall_Current />}
        */}

          <Grid item xs={12}>
            {state.weatherOnecall && <OpenWeatherOnecall_Current />}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { city } = query;

  const dataCurrent = city
    ? await fetchOpenWeatherCurrentByCityName(query as QueryType)
    : null;

  // const dataOnecall = null;
  const dataOnecall =
    dataCurrent?.coord?.lat && dataCurrent?.coord?.lon
      ? await fetchOpenWeatherOnecall(
          +dataCurrent.coord.lat,
          +dataCurrent.coord.lon,
          query as QueryType
        )
      : null;

  console.log('query', query);
  console.log('coord', dataCurrent?.coord?.lat, dataCurrent?.coord?.lon);
  // console.log(dataOnecall);

  return { props: { dataCurrent, dataOnecall } };
};

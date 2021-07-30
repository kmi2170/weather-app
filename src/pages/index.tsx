import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';

import {
  Container,
  Grid,
  Typography,
  AppBar,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { GetServerSideProps } from 'next';

import { WeatherContext, actionTypes } from '../reducer/reducer';
// import OpenWeatherCurrent from '../components/OpenWeather/OpenWeatherCurrent';
import Layout from '../components/Layout';
import Weather from '../components/Weather';
import Buttons from '../components/Buttons';

import ipLookup from '../lib/ipLookup';
import {
  fetchOpenWeatherCurrentByCoordinates,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
} from '../lib/fetchOpenWeather';

import { LocationType } from '../api/type_settings';
import { QueryType } from '../api/type_settings';

const useStyles = makeStyles((theme: Theme) => ({}));

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
    <Layout>
      <Buttons />
      <Weather />
    </Layout>
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

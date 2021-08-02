import { useState, useEffect, useContext, useRef } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';

import {
  Container,
  Grid,
  Typography,
  // AppBar,
  // List,
  // ListItem,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { purple, lime, lightGreen } from '@material-ui/core/colors';

import { GetServerSideProps } from 'next';

import { WeatherContext, actionTypes } from '../reducer/reducer';
import { LocationType } from '../api/type_settings';
import { QueryType } from '../api/type_settings';

import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import OpenWeatherOnecall_Current from '../components/OpenWeather/OpenWeatherOnecall_Current';
import OpenWeatherOnecall_Daily from '../components/OpenWeather/OpenWeatherOnecall_Daily';
import OpenWeatherOnecall_Minutely from '../components/OpenWeather/OpenWeatherOnecall_Minutely';
import OpenWeatherOnecall_Hourly from '../components/OpenWeather/OpenWeatherOnecall_Hourly';
import Alerts from '../components/Alerts';
import Footer from '../components/Footer';
import Preview from '../components/Preview';

import ipLookup from '../lib/ipLookup';
import {
  // fetchOpenWeatherCurrentByCoordinates,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
} from '../lib/fetchOpenWeather';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: purple[50],
  },
}));

const Home: React.FC<any> = ({ dataCurrent, dataOnecall }) => {
  const classes = useStyles();
  const itemRefs = useRef<HTMLDivElement[]>([]);

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

  // const handleItemRefs = (id: number) => {
  //   console.log(itemRefs?.current[+id - 1]);
  //   window.scroll(0, itemRefs?.current[+id - 1].offsetTop - 50);
  // };

  const saveItemRefs = (ref: HTMLDivElement) => {
    itemRefs.current.push(ref);
    // console.log('ref', itemRefs[0]?.current);
  };

  return (
    <div className={classes.root}>
      <SEO />
      <Navigation ref={itemRefs} />
      <Container>
        <Typography variant="h3" component="h1" align="center">
          My Weather Station
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div ref={(ref) => saveItemRefs(ref)} />
            {state.weatherOnecall ? (
              <OpenWeatherOnecall_Current />
            ) : (
              <Skeleton variant="rect" height={200} />
            )}
          </Grid>
          <Grid item xs={12}>
            {state.weatherOnecall ? (
              <OpenWeatherOnecall_Minutely />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>
          <Grid item xs={12}>
            <div ref={(ref) => saveItemRefs(ref)} />
            {state.weatherOnecall ? (
              <OpenWeatherOnecall_Hourly />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>
          <Grid item xs={12}>
            <div ref={(ref) => saveItemRefs(ref)} />
            {state.weatherOnecall ? (
              <OpenWeatherOnecall_Daily />
            ) : (
              <Grid
                container
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={1}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                  <Grid key={i} item xs={4} sm={3} md={2}>
                    <Skeleton variant="rect" height={200} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            {state.weatherOnecall && state.weatherOnecall.alerts && (
              <>
                <div ref={(ref) => saveItemRefs(ref)} />
                <Alerts />
              </>
            )}
          </Grid>
        </Grid>
        <Footer />
      </Container>
      <Preview data={state.weatherOnecall} />
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

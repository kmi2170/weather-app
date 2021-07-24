import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { GetServerSideProps } from 'next';

import CurrentOpenWeather from '../components/CurrentOpenWeather';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import Preview from '../components/Preview';

import ipLookup from '../lib/ipLookup';
import {
  fetchOpenWeatherCurrentByCoordinates,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
} from '../lib/fetchOpenWeather';
import { LocationType } from '../api/type_settings';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage:
      'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
    height: '100vh',
  },
}));

const Home: React.FC<any> = ({ dataCurrent, dataOnecall }) => {
  // const Home: React.FC<any> = () => {
  const classes = useStyles();
  const { query } = useRouter();

  const [location, setLocation] = useState<LocationType | null>(null);
  const [weatherCurrent, setWeatherCurrent] = useState<any>(null);
  const [weatherOnecall, setWeatherOnecall] = useState<any>(null);

  useEffect(() => {
    const getLocation = async () => {
      const res = await ipLookup();

      setLocation(res);

      router.push({
        pathname: '/',
        query: {
          // lat: res.lat,
          // lon: res.lon,
          city: res.city,
          state: res.region,
        },
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    setWeatherCurrent(dataCurrent);
    setWeatherOnecall(dataOnecall);
  }, [query]);

  return (
    <div className={classes.root}>
      <SEO />
      <Container>
        <Typography variant="h3" component="h1">
          Weather App
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Preview data={location} />
          </Grid>

          <Grid item xs={12}>
            {weatherCurrent && (
              <CurrentOpenWeather weatherCurrent={weatherCurrent} />
            )}
          </Grid>

          <Grid item xs={12}>
            {weatherOnecall && <Preview data={weatherOnecall} />}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { lat, lon, city, state } = query;

  //const data = await fetchOpenWeatherOnecall(+lat, +lon);

  // const dataCurrent = await fetchOpenWeatherCurrent(+lat, +lon);
  const dataCurrent =
    city && state
      ? await fetchOpenWeatherCurrentByCityName(city as string, state as string)
      : null;

  const dataOnecall =
    dataCurrent?.coord.lat && dataCurrent?.coord.lon
      ? await fetchOpenWeatherOnecall(
          +dataCurrent.coord.lat,
          +dataCurrent.coord.lon
        )
      : null;
  console.log('query', query);

  return { props: { dataCurrent, dataOnecall } };
};

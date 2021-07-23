import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { GetServerSideProps } from 'next';

import SEO from '../components/SEO';
import Footer from '../components/Footer';
import Preview from '../components/Preview';

import ipLookup from '../lib/ipLookup';
import fetchOpenWeather from '../lib/fetchOpenWeather';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage:
      'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
    height: '100vh',
  },
}));

export type LocationType = {
  city: string;
  region: string;
  postal: string;
  country_code: string;
  lat: number;
  lon: number;
};

const Home: React.FC<any> = ({ data }) => {
  // const Home: React.FC<any> = () => {
  const classes = useStyles();
  const { query } = useRouter();

  const [location, setLocation] = useState<LocationType | null>(null);
  const [weaterData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const getLocation = async () => {
      const res = await ipLookup();

      setLocation(res);
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      router.push({
        pathname: '/',
        query: { lat: location.lat, lon: location.lon },
      });

      setWeatherData(data);
    }
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
            <Preview data={weaterData} />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { lat, lon } = query;

  const data = await fetchOpenWeather(+lat, +lon);
  // console.log(query);

  return { props: { data } };
};

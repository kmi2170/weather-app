import { useState, useEffect } from 'react';

import axios from 'axios';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { GetServerSideProps } from 'next';

import SEO from '../components/SEO';
import Footer from '../components/Footer';
import Preview from '../components/Preview';

// const url =
//   'https://api.weatherapi.com/v1/current.json?key=fe70157311594d36b81212236212107&q=98597';
//
const baseUrl = 'https://api.weatherapi.com/v1/';
const weatherapi_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const url = `https://api.weatherapi.com/v1/ip.json?key=${weatherapi_key}&q=auto:ip`;

const fetcher = async (url: string) => {
  try {
    const { data } = await axios(url);
    // console.log(data);
    return { data, error: null };
  } catch (error) {
    console.error();
    return { data: null, error };
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage:
      'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
    height: '100vh',
  },
}));

const Home: React.FC<any> = ({ data }) => {
  const classes = useStyles();

  const [location, setLocation] = useState({});

  useEffect(() => {
    setLocation(data);
  }, [data]);

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
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

const key = 'fe70157311594d36b81212236212107';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await fetcher(url);
  // console.log(data, error);

  return { props: { data, error } };
};

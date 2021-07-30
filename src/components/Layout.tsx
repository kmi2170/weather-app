import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { purple, lime } from '@material-ui/core/colors';

import SEO from './SEO';
import Navigation from './Navigation';
import Footer from './Footer';
import Preview from './Preview';

import { WeatherContext, actionTypes } from '../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: lime[50],
    // backgroundImage:
    //   'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
  },
  text: {},
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  return (
    <div className={classes.root}>
      <Container>
        <SEO />
        <Typography variant="h3" component="h1">
          My Weather Station
        </Typography>
        <Navigation />
        <main>{children}</main>
      </Container>
      <Preview data={state.weatherOnecall} />
      <Footer />
    </div>
  );
};

export default Layout;

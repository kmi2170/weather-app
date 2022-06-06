import { useCallback, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLocation } from '../features/weatherSlice';
import { asyncThunkIpLookupLocation } from '../features/weatherAsyncThunk';
import { useGetWeatherOnecallQuery } from '../services/weatherOnecallApi';
import { useCustomeCookies } from '../hooks/useCustomCookies';

import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import Alerts from '../components/Alerts';
import Footer from '../components/Footer';
import {
  OpenWeatherOnecall_Current,
  OpenWeatherOnecall_Daily,
  OpenWeatherOnecall_Minutely,
  OpenWeatherOnecall_Hourly,
} from '../components/OpenWeather';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    background: purple[50],
    minHeight: '100vh',
  },
  noLocation: {
    margin: '5rem 0',
  },
  title: {
    marginTop: '1rem',
  },
}));

const Home = () => {
  const classes = useStyles();
  const itemRefs = useRef<HTMLDivElement[]>(new Array(4));

  const units = useAppSelector(state => state.weather.units);
  const lang = useAppSelector(state => state.weather.lang);
  const { city, region, country, lat, lon } = useAppSelector(
    state => state.weather.location
  );
  const dispatch = useAppDispatch();

  const { data: dataOnecall } = useGetWeatherOnecallQuery({
    lat,
    lon,
    units,
    lang,
  });

  const { cookies, setLocationCookie } = useCustomeCookies();

  useEffect(() => {
    if (cookies.weather_location) {
      const { city, region, country, lat, lon } = cookies.weather_location;
      if (city && region && country && lat && lon) {
        dispatch(setLocation(cookies.weather_location));
      }
      return;
    }

    dispatch(asyncThunkIpLookupLocation());
  }, []);

  useEffect(
    () => {
      if (city && region && country && lat && lon) {
        setLocationCookie({ city, region, country, lat, lon });
      }
    },
    [lat, lon]
  );

  // const saveItemRefs = (ref: HTMLDivElement, index: number) => {
  //   itemRefs.current[index] = ref;
  // };
  const saveItemRefs = useCallback((ref: HTMLDivElement, index: number) => {
    itemRefs.current[index] = ref;
  }, []);

  return (
    <div className={classes.root}>
      <Navbar ref={itemRefs} />
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              className={classes.title}
            >
              My Weather Station
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{ flex: 'display', justifyContent: 'center' }}>
              <Searchbar />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div ref={ref => saveItemRefs(ref, 0)} />
            {dataOnecall ? (
              <OpenWeatherOnecall_Current />
            ) : (
              <Skeleton variant="rect" height={200} />
            )}
          </Grid>
          <Grid item xs={12}>
            <div ref={ref => saveItemRefs(ref, 1)} />
            {dataOnecall ? (
              <OpenWeatherOnecall_Minutely />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>
          <Grid item xs={12}>
            <div ref={ref => saveItemRefs(ref, 2)} />
            {dataOnecall ? (
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
            <div ref={ref => saveItemRefs(ref, 3)} />
            {dataOnecall ? (
              <OpenWeatherOnecall_Hourly />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>
          <Grid item xs={12}>
            {dataOnecall &&
              dataOnecall['alerts'] && (
                <>
                  <div ref={ref => saveItemRefs(ref, 4)} />
                  <Alerts />
                </>
              )}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

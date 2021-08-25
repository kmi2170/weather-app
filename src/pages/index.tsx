import { useEffect, useContext, useRef } from 'react';
import router, { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

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
// import { LocationType } from '../api/type_settings';
import { QueryType } from '../api/type_settings';

import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Searchbar from '../components/Searchbar';
// import Buttons from '../components/Buttons';
import OpenWeatherOnecall_Current from '../components/OpenWeather/OpenWeatherOnecall_Current';
import OpenWeatherOnecall_Daily from '../components/OpenWeather/OpenWeatherOnecall_Daily';
import OpenWeatherOnecall_Minutely from '../components/OpenWeather/OpenWeatherOnecall_Minutely';
import OpenWeatherOnecall_Hourly from '../components/OpenWeather/OpenWeatherOnecall_Hourly';
import Alerts from '../components/Alerts';
import Footer from '../components/Footer';
// import Preview from '../components/Preview';

import ipLookup from '../lib/ipLookup';
import { fetchWeatherAPILocation } from '../lib/fetchWeatherApi';
import {
  // fetchOpenWeatherCurrentByCoordinates,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
  fetchOpenGeocodingByLocationName,
} from '../lib/fetchOpenWeather';

const useStyles = makeStyles((theme: Theme) => ({
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

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

const Home: React.FC<any> = ({
  dataLocationName,
  dataSearchLocation,
  isNotFoundLocation,
  dataCurrent,
  dataOnecall,
}) => {
  const classes = useStyles();
  //const itemRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLDivElement[]>(new Array(4));

  const { state, dispatch } = useContext(WeatherContext);
  const { query } = useRouter();

  const [cookies, setCookie] = useCookies([
    'myweather_coordinates',
    'myweather_units',
  ]);

  const setCookieFunc = (
    name: 'myweather_coordinates|myweather_units',
    value: string
  ) => setCookie(name, value, cookiesOptions);

  useEffect(() => {
    if (cookies.myweather_coordinates) {
      const lat = +cookies.myweather_coordinates[0];
      const lon = +cookies.myweather_coordinates[1];

      dispatch({
        type: actionTypes.SET_LOCATION,
        payload: { lat, lon },
      });

      let units: string;
      if (cookies.myweather_units) {
        units = cookies.myweather_units;

        dispatch({
          type: actionTypes.SET_UNITS,
          payload: units,
        });
      }

      router.push({
        pathname: '/',
        query: { lat, lon, units, lang: state.lang },
      });
    } else {
      const getLocation = async () => {
        const res = await ipLookup();

        const { city, region, country } = res;

        dispatch({
          type: actionTypes.SET_IP_LOCATION,
          payload: {
            city: city as string,
            state: (region as string) || '',
            country: country as string,
            // lat: lat as number,
            // lon: lon as number,
            // timezone: timezone as string,
          },
        });

        router.push({
          pathname: '/',
          query: {
            ipCity: city,
            ipState: region,
            ipCountry: country,
            units: state.units,
            lang: state.lang,
          },
        });
      };

      getLocation();
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_LOCATION,
      payload: {
        city: dataLocationName?.location.name as string,
        state: dataLocationName?.location.region as string,
        country: dataLocationName?.location.country as string,
      },
    });
  }, [dataLocationName, dispatch]);

  useEffect(() => {
    // dispatch({ type: actionTypes.SET_WEATHER_CURRENT, payload: dataCurrent });
    if (dataCurrent) {
      const lat = +dataCurrent.coord.lat;
      const lon = +dataCurrent.coord.lon;

      dispatch({
        type: actionTypes.SET_LOCATION,
        payload: { lat, lon },
      });

      router.push({
        pathname: '/',
        query: { lat, lon, units: state.units, lang: state.lang },
      });
    }
  }, [dataCurrent, dispatch]);

  useEffect(() => {
    if (dataSearchLocation && dataSearchLocation.length !== 0) {
      const lat = +dataSearchLocation[0].lat;
      const lon = +dataSearchLocation[0].lon;

      dispatch({
        type: actionTypes.SET_LOCATION,
        payload: { lat, lon },
      });

      router.push({
        pathname: '/',
        query: { lat, lon, units: state.units, lang: state.lang },
      });

      setCookieFunc('myweather_coordinates', JSON.stringify([lat, lon]));
    }
  }, [dataSearchLocation, dispatch]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_WEATHER_ONECALL, payload: dataOnecall });
  }, [dataOnecall, dataSearchLocation, dispatch]);

  useEffect(() => {
    setCookieFunc('myweather_units', state.units);
  }, [state.units]);

  const saveItemRefs = (ref: HTMLDivElement, index: number) => {
    // itemRefs.current.push(ref);
    itemRefs.current[index] = ref;
    // console.log('ref', itemRefs.current);
  };

  return (
    <div className={classes.root}>
      <SEO />
      <Navigation ref={itemRefs} />
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

          {isNotFoundLocation ? (
            <Typography
              variant="h4"
              align="center"
              className={classes.noLocation}
            >
              No Location Found
            </Typography>
          ) : (
            <>
              <Grid item xs={12}>
                <div ref={(ref) => saveItemRefs(ref, 0)} />
                {state.weatherOnecall ? (
                  <OpenWeatherOnecall_Current />
                ) : (
                  <Skeleton variant="rect" height={200} />
                )}
              </Grid>
              <Grid item xs={12}>
                <div ref={(ref) => saveItemRefs(ref, 1)} />
                {state.weatherOnecall ? (
                  <OpenWeatherOnecall_Minutely />
                ) : (
                  <Skeleton variant="rect" height={150} />
                )}
              </Grid>
              <Grid item xs={12}>
                <div ref={(ref) => saveItemRefs(ref, 2)} />
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
                <div ref={(ref) => saveItemRefs(ref, 3)} />
                {state.weatherOnecall ? (
                  <OpenWeatherOnecall_Hourly />
                ) : (
                  <Skeleton variant="rect" height={150} />
                )}
              </Grid>
              <Grid item xs={12}>
                {state.weatherOnecall && state.weatherOnecall.alerts && (
                  <>
                    <div ref={(ref) => saveItemRefs(ref, 4)} />
                    <Alerts />
                  </>
                )}
              </Grid>
            </>
          )}
        </Grid>
        <Footer />
      </Container>
      {/* 
      <Preview data={state.weatherOnecall} />
      */}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const {
    ipCity,
    ipState,
    ipCountry,
    lang,
    units,
    lat,
    lon,
    searchLocation,
  } = query;

  // const dataCurrent = null;
  const dataCurrent = ipCity
    ? await fetchOpenWeatherCurrentByCityName(
        ipCity as string,
        ipState as string,
        ipCountry as string,
        units as string,
        lang as string
      )
    : null;

  const dataSearchLocation = searchLocation
    ? await fetchOpenGeocodingByLocationName(searchLocation as string)
    : null;

  const isNotFoundLocation = dataSearchLocation
    ? dataSearchLocation.length != 0
      ? false
      : true
    : false;

  // let [latitude, longitude] =
  //   dataCurrent?.coord?.lat && dataCurrent?.coord?.lon
  //     ? [dataCurrent.coord.lat, dataCurrent?.coord.lon]
  //     : [null, null];

  // [latitude, longitude] =
  //   dataSearchLocation && dataSearchLocation.length !== 0
  //     ? [dataSearchLocation[0].lat, dataSearchLocation[0].lon]
  //     : [latitude, longitude];

  // const dataOnecall = null;
  const dataOnecall =
    lat && lon
      ? await fetchOpenWeatherOnecall(+lat, +lon, query as QueryType)
      : null;

  // const dataLocationName = null;
  const dataLocationName =
    lat && lon ? await fetchWeatherAPILocation(+lat, +lon) : null;

  // let dataLocation = city
  //   ? await fetchOpenGeocodingByLocationName(`${city},${state}` as string)
  //   : null;
  //
  console.log('query', query);
  console.log('dataCurrent.coord', dataCurrent?.coord);
  console.log(
    'searchLocation',
    dataSearchLocation && dataSearchLocation[0] && dataSearchLocation[0].name
  );
  console.log('isNotFoundLocation', isNotFoundLocation);
  // console.log(dataOnecall);
  console.log(dataLocationName && dataLocationName.location);

  return {
    props: {
      dataLocationName,
      dataCurrent,
      dataSearchLocation,
      isNotFoundLocation,
      dataOnecall,
    },
  };
};

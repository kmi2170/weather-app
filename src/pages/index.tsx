import { useEffect, useRef } from "react";

import { useCookies } from "react-cookie";

import { Container, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLocation, setUnits, selectWeather } from "../features/weatherSlice";
import { asyncThunkIpLookupLocation } from "../features/weatherAsyncThunk";
import { useGetWeatherOnecallQuery } from "../services/weatherOnecallApi";

import { CookieNameType } from "../api/type_settings";

import SEO from "../components/SEO";
import Navbar from "../components/Navbar/Navbar";
import Searchbar from "../components/Searchbar";
import Alerts from "../components/Alerts";
import Footer from "../components/Footer";
import {
  OpenWeatherOnecall_Current,
  OpenWeatherOnecall_Daily,
  OpenWeatherOnecall_Minutely,
  OpenWeatherOnecall_Hourly,
} from "../components/OpenWeather";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: purple[50],
    // background: lime[100],
    minHeight: "100vh",
  },
  noLocation: {
    margin: "5rem 0",
  },
  title: {
    marginTop: "1rem",
  },
}));

const cookiesOptions = {
  path: "/",
  maxAge: 2600000,
  sameSite: true,
};

const Home: React.FC = ({}) => {
  const classes = useStyles();
  const itemRefs = useRef<HTMLDivElement[]>(new Array(4));

  const {
    units,
    lang,
    location: { city, state, country, lat, lon },
  } = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();

  const { data: dataOnecall } = useGetWeatherOnecallQuery({
    lat,
    lon,
    units,
    lang,
  });

  // console.log(dataOnecall);

  const [cookies, setCookie] = useCookies([
    "myweather_location",
    "myweather_units",
  ] as CookieNameType[]);

  useEffect(() => {
    if (cookies.myweather_location) {
      console.log(cookies.myweather_location);
      const [city, state, country, lat, lon] = cookies.myweather_location;
      dispatch(setLocation({ city, state, country, lat, lon }));

      // let units_cookie: Units;
      if (cookies.myweather_units) {
        const units_cookie = cookies.myweather_units;
        dispatch(setUnits(units_cookie));
      }
    } else {
      dispatch(asyncThunkIpLookupLocation());
    }
  }, []);

  useEffect(() => {
    if (city && state && country && lat && lon) {
      setCookie(
        "myweather_location" as CookieNameType,
        JSON.stringify([city, state, country, lat, lon]),
        cookiesOptions
      );
    }
  }, [lat, lon]);

  useEffect(() => {
    setCookie("myweather_units" as CookieNameType, units, cookiesOptions);
  }, [units]);

  const saveItemRefs = (ref: HTMLDivElement, index: number) => {
    itemRefs.current[index] = ref;
  };

  return (
    <div className={classes.root}>
      <SEO />
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
            <div style={{ flex: "display", justifyContent: "center" }}>
              <Searchbar />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div ref={(ref) => saveItemRefs(ref, 0)} />
            {dataOnecall ? (
              <OpenWeatherOnecall_Current />
            ) : (
              <Skeleton variant="rect" height={200} />
            )}
          </Grid>
          <Grid item xs={12}>
            <div ref={(ref) => saveItemRefs(ref, 1)} />
            {dataOnecall ? (
              <OpenWeatherOnecall_Minutely />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>
          <Grid item xs={12}>
            <div ref={(ref) => saveItemRefs(ref, 2)} />
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
            <div ref={(ref) => saveItemRefs(ref, 3)} />
            {dataOnecall ? (
              <OpenWeatherOnecall_Hourly />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>
          <Grid item xs={12}>
            {dataOnecall && dataOnecall["alerts"] && (
              <>
                <div ref={(ref) => saveItemRefs(ref, 4)} />
                <Alerts />
              </>
            )}
          </Grid>
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

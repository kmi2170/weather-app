import { useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLocation } from "../features/weatherSlice";
import { asyncThunkIpLookupLocation } from "../features/weatherAsyncThunk";
import { useGetWeatherQuery } from "../services/weatherApi";
import { useCustomCookies } from "../hooks/useCustomCookies";
import Navbar from "../components/Navbar";
import SearchLocationBar from "../components/SearchLocationBar";
import Alerts from "../components/Alerts";
import Footer from "../components/Footer";
import {
  WeatherCurrent,
  WeatherDaily,
  WeatherHourly,
  WeatherMinutely,
} from "../components/Weather";
import { isLocationValid } from "../utils/cookiesValidator";
import { Location } from "../features/initialState";
import { Weather } from "../api/types";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    background: purple[50],
    minHeight: "100vh",
  },
  noLocation: {
    margin: "5rem 0",
  },
  title: {
    marginTop: "1rem",
  },
}));

const Home = () => {
  const classes = useStyles();
  const menuItemRefs = useRef(new Array(4) as HTMLDivElement[]);

  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.weather.units);
  const lang = useAppSelector((state) => state.weather.lang);
  const location = useAppSelector((state) => state.weather.location);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });
  const isAlerts = !!(data as Weather)?.alerts;

  const { cookies, setLocationCookie } = useCustomCookies();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLocationValid(cookies.weather_location)) {
      dispatch(setLocation(cookies.weather_location as Location));
      return;
    }

    dispatch(asyncThunkIpLookupLocation()).catch((error) =>
      console.error(error)
    );
  }, []);

  useEffect(() => {
    if (isLocationValid(location)) {
      setLocationCookie(location);
    }
  }, [location]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const saveMenuItemRefs = (ref: HTMLDivElement, index: number) => {
    menuItemRefs.current[index] = ref;
  };

  return (
    <div className={classes.root}>
      <Navbar ref={menuItemRefs} />
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
            <SearchLocationBar />
          </Grid>

          <Grid
            item
            xs={12}
            ref={(ref) => ref != null && saveMenuItemRefs(ref, 0)}
          >
            {data ? (
              <WeatherCurrent />
            ) : (
              <Skeleton variant="rect" height={200} />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            ref={(ref) => ref != null && saveMenuItemRefs(ref, 1)}
          >
            {data ? (
              <WeatherMinutely />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            ref={(ref) => ref != null && saveMenuItemRefs(ref, 2)}
          >
            {data ? (
              <WeatherDaily />
            ) : (
              <Grid
                container
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={1}
              >
                {Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <Grid key={i} item xs={4} sm={3} md={2}>
                      <Skeleton variant="rect" height={250} />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            ref={(ref) => ref != null && saveMenuItemRefs(ref, 3)}
          >
            {data ? (
              <WeatherHourly />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </Grid>

          {isAlerts && (
            <Grid
              item
              xs={12}
              ref={(ref) => ref != null && saveMenuItemRefs(ref, 4)}
            >
              <Alerts />
            </Grid>
          )}
        </Grid>

        <Footer />
      </Container>
    </div>
  );
};

export default Home;

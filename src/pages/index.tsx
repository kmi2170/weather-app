import { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
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
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  noLocation: {
    margin: "5rem 0",
  },
  title: {
    marginTop: "1rem",
    color: theme.palette.primary.dark,
  },
}));

const Home = () => {
  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <Navbar />
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

          <Grid id="current" item xs={12}>
            {data ? (
              <WeatherCurrent />
            ) : (
              <Skeleton variant="rectangular" height={200} />
            )}
          </Grid>

          <Grid id="minutely" item xs={12}>
            {data ? (
              <WeatherMinutely />
            ) : (
              <Skeleton variant="rectangular" height={150} />
            )}
          </Grid>

          <Grid id="daily" item xs={12}>
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
                      <Skeleton variant="rectangular" height={250} />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>

          <Grid id="hourly" item xs={12}>
            {data ? (
              <WeatherHourly />
            ) : (
              <Skeleton variant="rectangular" height={150} />
            )}
          </Grid>

          {isAlerts && (
            <Grid id="alerts" item xs={12}>
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

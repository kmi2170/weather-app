import { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { setLocation } from "../slice/weatherSlice";
import { asyncThunkIpLookupLocation } from "../slice/weatherAsyncThunk";
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
  WeatherFortyEightHours,
} from "../components/Weather";
import { isLocationValid } from "../utils/cookiesValidator";
import { Location } from "../store/initialState";
import ErrorModal from "../components/Modals/errorModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const { units, lang, location } = useAppSelector((state) => state.weather);

  const { isLoading, isError } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { cookies, setLocationCookie } = useCustomCookies();

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

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      {isError && <ErrorModal />}
      <div id="top" />
      <Navbar />
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              sx={(theme) => ({
                marginTop: "1rem",
                color: theme.palette.primary.dark,
              })}
            >
              My Weather Station
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <SearchLocationBar />
          </Grid>

          <Grid item xs={12}>
            {!isLoading ? (
              <WeatherCurrent />
            ) : (
              <Skeleton variant="rectangular" height={200} />
            )}
          </Grid>

          <Grid id="forty-eight-hours" item xs={12}>
            {!isLoading ? (
              <WeatherFortyEightHours />
            ) : (
              <Skeleton variant="rectangular" height={150} />
            )}
          </Grid>

          <Grid id="minutely" item xs={12}>
            {!isLoading ? (
              <WeatherMinutely />
            ) : (
              <Skeleton variant="rectangular" height={150} />
            )}
          </Grid>

          <Grid id="daily" item xs={12}>
            {!isLoading ? (
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

          <Grid id="charts" item xs={12}>
            {!isLoading ? (
              <WeatherHourly />
            ) : (
              <Skeleton variant="rectangular" height={150} />
            )}
          </Grid>

          <Grid id="alerts" item xs={12}>
            <Alerts />
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </Box>
  );
};

export default Home;

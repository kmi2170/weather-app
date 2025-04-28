"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
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
import ErrorModal from "../components/Modals/errorModal";
import WeatherMap from "./weathermap/page";
import { useLocation } from "../hooks/useLocation";

const Home = () => {
  const { isLoading, isError } = useLocation();

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
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
            >
              Current
            </Typography>
            {!isLoading ? (
              <WeatherCurrent />
            ) : (
              <Skeleton variant="rectangular" height={450} />
            )}
          </Grid>

          <Grid id="minutely" item xs={12}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
            >
              Minutely
            </Typography>
            {!isLoading ? (
              <WeatherMinutely />
            ) : (
              <Skeleton variant="rectangular" height={200} />
            )}
          </Grid>

          <Grid id="forty-eight-hours" item xs={12}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
            >
              48 Hours
            </Typography>
            {!isLoading ? (
              <WeatherFortyEightHours />
            ) : (
              <Skeleton variant="rectangular" height={325} />
            )}
          </Grid>

          <Grid id="daily" item xs={12}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
            >
              Daily
            </Typography>
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
                      <Skeleton variant="rectangular" height={350} />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>

          <Grid id="charts" item xs={12}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
            >
              48 Hours Charts
            </Typography>
            {!isLoading ? (
              <WeatherHourly />
            ) : (
              <Skeleton variant="rectangular" height={600} />
            )}
          </Grid>

          <Grid id="map" item xs={12}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
            >
              Map
            </Typography>
            {!isLoading ? (
              <WeatherMap />
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{ height: { xs: "500px", sm: "600px", md: "650px" } }}
              />
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

import { useEffect, useRef } from "react";
import router from "next/router";

import { useCookies } from "react-cookie";

import { Container, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { GetServerSideProps } from "next";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  // setIpLocation,
  setLocation,
  setUnits,
  // setWeatherOnecall,
  selectWeather,
} from "../features/weatherSlice";
import { asyncThunkIpLookupLocation } from "../features/weatherAsyncThunk";
import { useGetWeatherOnecallQuery } from "../services/weatherOnecallApi";
import { Units } from "../features/initialState";

import { QueryType, CookieNameType } from "../api/type_settings";

import SEO from "../components/SEO";
import Navbar from "../components/Navbar/Navbar";
import Searchbar from "../components/Searchbar";
import Alerts from "../components/Alerts";
import Footer from "../components/Footer";
// import Preview from '../components/Preview';
import {
  OpenWeatherOnecall_Current,
  OpenWeatherOnecall_Daily,
  OpenWeatherOnecall_Minutely,
  OpenWeatherOnecall_Hourly,
} from "../components/OpenWeather";

import {
  // ipLookup,
  fetchWeatherAPILocation,
  // fetchOpenWeatherCurrentByCoordinates,
  fetchOpenWeatherCurrentByCityName,
  fetchOpenWeatherOnecall,
  fetchOpenGeocodingByLocationName,
} from "../api/lib";

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

const Home: React.FC<any> = ({
  dataLocationName,
  dataSearchLocation,
  isNotFoundLocation,
}) => {
  const classes = useStyles();
  const itemRefs = useRef<HTMLDivElement[]>(new Array(4));
  // const { query } = useRouter();

  const { units, lang, location } = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();

  const { data: dataOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  console.log(dataOnecall);

  const [cookies, setCookie] = useCookies([
    "myweather_coordinates",
    "myweather_units",
  ] as CookieNameType[]);

  useEffect(() => {
    if (cookies.myweather_coordinates) {
      const [lat, lon] = cookies.myweather_coordinates;
      dispatch(setLocation({ lat, lon }));

      let units_cookie: Units;
      if (cookies.myweather_units) {
        units_cookie = cookies.myweather_units;
        dispatch(setUnits(units_cookie));
      }

      router.push({
        pathname: "/",
        query: { lat, lon, units: units_cookie, lang },
      });
    } else {
      dispatch(asyncThunkIpLookupLocation());
    }
  }, []);

  useEffect(() => {
    dispatch(
      setLocation({
        city: dataLocationName?.location.name,
        state: dataLocationName?.location.region,
        country: dataLocationName?.location.country,
      })
    );
  }, [dataLocationName, dispatch]);

  useEffect(() => {
    if (dataSearchLocation && dataSearchLocation.length !== 0) {
      const { lat, lon } = dataSearchLocation[0];

      dispatch(setLocation({ lat, lon }));

      router.push({
        pathname: "/",
        query: { lat, lon, units, lang },
      });

      setCookie(
        "myweather_coordinates" as CookieNameType,
        JSON.stringify([lat, lon]),
        cookiesOptions
      );
    }
  }, [dataSearchLocation, dispatch]);

  // useEffect(() => {
  //   dispatch(setWeatherOnecall(weatherOnecall));
  // }, [weatherOnecall, dataSearchLocation]);

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
  const { ipCity, ipState, ipCountry, lang, units, lat, lon, searchLocation } =
    query;

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

  const dataLocationName = null;
  // const dataLocationName =
  //   lat && lon ? await fetchWeatherAPILocation(+lat, +lon) : null;

  // let dataLocation = city
  //   ? await fetchOpenGeocodingByLocationName(`${city},${state}` as string)
  //   : null;
  //
  console.log("query", query);
  console.log("dataCurrent.coord", dataCurrent?.coord);
  console.log(
    "searchLocation",
    dataSearchLocation && dataSearchLocation[0] && dataSearchLocation[0].name
  );
  console.log("isNotFoundLocation", isNotFoundLocation);
  // console.log(dataOnecall);
  console.log(dataLocationName && dataLocationName.location);

  return {
    props: {
      dataLocationName,
      dataSearchLocation,
      isNotFoundLocation,
    },
  };
};

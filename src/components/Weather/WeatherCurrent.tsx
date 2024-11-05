import { memo } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { yellow, orange } from "@mui/material/colors";

import { useAppSelector } from "../../store/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";

import {
  tempWithUnit,
  precipitationWithUnit,
  pressureWithUnit,
  visibilityWithUnit,
  isDay,
} from "../../utils/units";
import WeatherIcon from "./icons/WeatherIcon";
import WindIcon from "./icons/WindIcon";
import MoonIcon from "./icons/MoonIcon";
import { currentLocalTime, localTime } from "../../utils/time";
import { Weather } from "../../api/types/weather";
import theme from "../../theme/theme";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: "1.5rem 3.5rem 1.5rem 3.5rem",
  },
  locationContainer: {
    marginBottom: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    [theme.breakpoints?.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
    alignItems: "center",
  },
  locationSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  weatherContainer: {
    display: "flex",
    flexDirection: "column",
  },
  weatherMain: {
    borderRadius: "20px",
  },
  cloud: { marginBottom: "1rem" },
  country: {
    [theme.breakpoints?.up("sm")]: {
      marginLeft: "1rem",
    },
  },
  iconSun: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
    marginRight: "0.5rem",
  },
  iconMoon: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
    marginRight: "0.5rem",
    marginLeft: "0.25rem",
  },
  sunDecoration: {
    borderBottom: `2px solid ${orange[500]}`,
  },
  moonDecoration: {
    borderBottom: `2px solid ${yellow[500]}`,
  },
}));

const WeatherCurrent = () => {
  const classes = useStyles();

  const { units, location, lang } = useAppSelector((state) => state.weather);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { timezone, current, daily } = data as Weather;

  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    clouds,
    uvi,
    visibility,
    rain,
    snow,
    weather,
    wind_speed,
    wind_deg,
    wind_gust,
  } = current;
  const { moonrise, moonset, moon_phase } = daily[0];

  const { city, region, country } = location;

  const totalPrecipitation = (rain?.["1h"] || 0) + (snow?.["1h"] || 0);

  const _isDay = isDay(dt, sunrise, sunset);
  const font_color = _isDay ? "black" : "white";
  const font_color_temp = _isDay ? theme.palette.primary.main : "pink";
  const font_color_date = _isDay ? "dodgerblue" : "lightcyan";
  const icon_color = _isDay ? theme.palette.primary.main : "lightpink";
  const bg_color = _isDay ? "lightcyan" : "darkslateblue";
  // const bg_color = _isDay ? "lightcyan" : "midnightblue";
  // const bg_color = _isDay ? "lightcyan" : theme.palette.primary.main;

  return (
    <>
      <Paper elevation={2} className={classes.paper}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.text}
            style={{ marginLeft: "1rem" }}
          >
            {currentLocalTime()}
          </Typography>
        </div>

        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} className={classes.locationContainer}>
            <div className={classes.locationSubContainer}>
              <Typography variant="h5" className={classes.text}>
                {city}
                {region && <span>,&nbsp;</span>}
              </Typography>
              <Typography variant="h6" className={classes.text}>
                {region}
              </Typography>
            </div>

            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.country}
              style={{ fontStyle: "italic" }}
            >
              {country}
            </Typography>

            {location?.lat && location?.lon && (
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.text}
                style={{ marginLeft: "1rem", marginTop: "0.25rem" }}
              >
                lat: {location.lat.toFixed(3)}, lon: {location.lon.toFixed(3)}
              </Typography>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            container
            alignItems="center"
            className={classes.weatherMain}
            sx={{ backgroundColor: bg_color }}
          >
            <Grid item xs={4}>
              <div className={classes.weatherContainer}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: font_color }}
                >
                  {weather[0].main}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "4rem",
                  }}
                >
                  <WeatherIcon
                    sunrise={sunrise}
                    sunset={sunset}
                    weatherId={weather[0].id}
                    current
                    size="4rem"
                    iconColor={icon_color}
                  />
                </div>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ color: font_color }}
                >
                  {weather[0].description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: font_color_temp }}
                >
                  {tempWithUnit(temp, units)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  align="center"
                  sx={{ color: font_color }}
                >
                  Feels like {tempWithUnit(feels_like, units)}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <WindIcon
                wind_speed={wind_speed}
                wind_deg={wind_deg}
                wind_gust={wind_gust}
                current
                iconColor={icon_color}
                fontColor={font_color_temp}
              />
            </Grid>
            <Grid item xs={12} className={classes.cloud}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
                sx={{ color: font_color }}
              >
                Cloud Cover {clouds} %
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} container>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Humidity {humidity} %</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Pressure {pressureWithUnit(pressure, units)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Visibility {visibilityWithUnit(visibility, units)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">UV index {uvi}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">
                Precipitation {precipitationWithUnit(totalPrecipitation, units)}
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
              {rain && rain["1h"] && (
                <Typography variant="subtitle2">
                  Rain (Last 1 hour), {precipitationWithUnit(rain["1h"], units)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {snow && snow["1h"] && (
                <Typography variant="subtitle2">
                  Snow (Last 1 hour), {precipitationWithUnit(snow["1h"], units)}
                </Typography>
              )}
            </Grid> */}

            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <span className={classes.sunDecoration}>Sun</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i className={`wi wi-sunrise ${classes.iconSun}`} />
                {localTime(sunrise, timezone)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <i className={`wi wi-sunset ${classes.iconSun}`} />
                {localTime(sunset, timezone)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <span className={classes.moonDecoration}>Moon</span>
                &nbsp;
                <i className={`wi wi-moonrise ${classes.iconMoon}`} />
                {localTime(moonrise, timezone)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <i className={`wi wi-moonset ${classes.iconMoon}`} />
                {localTime(moonset, timezone)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MoonIcon moon_phase={moon_phase} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default memo(WeatherCurrent);

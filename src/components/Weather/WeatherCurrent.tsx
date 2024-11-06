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
import { Units } from "../../store/initialState";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    // padding: "1.5rem 3.5rem 1.5rem 3.5rem",
  },
  currentMain: {
    display: "flex",
    flexDirection: "column",
  },
  locationContainer: {
    marginBottom: "0.5rem",
    display: "flex",
    flexDirection: "column",
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
    fontStyle: "italic",
    [theme.breakpoints?.up("sm")]: {
      marginLeft: "1rem",
    },
  },
  currentOthers: {
    padding: "1rem 2rem",
    background: "lightgreen",
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
  },
  currentOthersData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  almanac: {
    padding: "1rem 2rem",
    background: "lightyellow",
  },
  almanacTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "2rem",
    alignItems: "center",
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
      <div>
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12} sm={7}>
            <CurrentMain
              city={city}
              region={region}
              country={country}
              lat={location?.lat}
              lon={location?.lon}
              sunrise={sunrise}
              sunset={sunset}
              id={weather[0]?.id}
              main={weather[0]?.main}
              description={weather[0]?.description}
              temp={temp}
              feels_like={feels_like}
              wind_speed={wind_speed}
              wind_deg={wind_deg}
              wind_gust={wind_gust}
              clouds={clouds}
              units={units}
              isDay={_isDay}
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            sm={5}
            flexDirection="column"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <CurrentOthers
              totalPrecipitation={totalPrecipitation}
              humidity={humidity}
              pressure={pressure}
              visibility={visibility}
              uvi={uvi}
              units={units}
            />
            <Almanac
              sunrise={sunrise}
              sunset={sunset}
              moonrise={moonrise}
              moonset={moonset}
              moon_phase={moon_phase}
              timezone={timezone}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default memo(WeatherCurrent);

type CurrentMainProps = {
  city: string;
  region: string;
  country: string;
  lat?: number | null;
  lon?: number | null;
  sunrise: number;
  sunset: number;
  id: number;
  main: string;
  description: string;
  temp: number;
  feels_like: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  clouds: number;
  units: Units;
  isDay: boolean;
};

const CurrentMain = (props: CurrentMainProps) => {
  const classes = useStyles();

  const {
    city,
    region,
    country,
    lat,
    lon,
    sunrise,
    sunset,
    id,
    main,
    description,
    temp,
    feels_like,
    wind_speed,
    wind_deg,
    wind_gust,
    clouds,
    units,
    isDay,
  } = props;

  const font_color = isDay ? "black" : "white";
  const font_color_temp = isDay ? theme.palette.primary.main : "pink";
  const font_color_date = isDay ? "dodgerblue" : "lightcyan";
  const icon_color = isDay ? theme.palette.primary.main : "lightpink";
  const bg_color = isDay ? "lightcyan" : "darkslateblue";

  return (
    <Paper
      elevation={2}
      className={classes.currentMain}
      sx={{ backgroundColor: bg_color }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          className={classes.text}
          sx={{ color: font_color, marginTop: "0.5rem", marginLeft: "2rem" }}
        >
          {currentLocalTime()}
        </Typography>
      </div>

      <div className={classes.locationContainer}>
        <div className={classes.locationSubContainer}>
          <Typography variant="h5" sx={{ color: font_color_date }}>
            {city}
            {region && <span>,&nbsp;</span>}
          </Typography>
          <Typography variant="h6" sx={{ color: font_color_date }}>
            {region}
          </Typography>
          <Typography
            variant="h6"
            className={classes.country}
            sx={{ color: font_color_date }}
          >
            {country}
          </Typography>
        </div>

        {lat && lon && (
          <Typography
            variant="subtitle2"
            className={classes.text}
            sx={{ color: font_color, marginLeft: "1rem", marginTop: "0.25rem" }}
          >
            lat: {lat.toFixed(3)}, lon: {lon.toFixed(3)}
          </Typography>
        )}
      </div>

      <Grid
        item
        container
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        className={classes.weatherMain}
      >
        <Grid item xs={4}>
          <div className={classes.weatherContainer}>
            <Typography variant="h6" align="center" sx={{ color: font_color }}>
              {main}
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
                weatherId={id}
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
              {description}
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

        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="center"
          className={classes.cloud}
          sx={{ color: font_color, width: "100%" }}
        >
          Cloud Cover {clouds} %
        </Typography>
      </Grid>
    </Paper>
  );
};

type CurrentOthersProps = {
  totalPrecipitation: number;
  humidity: number;
  pressure: number;
  visibility: number;
  uvi: number;
  units: Units;
};

const CurrentOthers = (props: CurrentOthersProps) => {
  const classes = useStyles();

  const { totalPrecipitation, humidity, pressure, visibility, uvi, units } =
    props;

  return (
    <Paper elevation={2} className={classes.currentOthers}>
      <div className={classes.currentOthersData}>
        <Typography variant="subtitle2">
          Precipitation {precipitationWithUnit(totalPrecipitation, units)}
        </Typography>
        <Typography variant="subtitle2">Humidity {humidity} %</Typography>
        <Typography variant="subtitle2">
          Pressure {pressureWithUnit(pressure, units)}
        </Typography>
      </div>

      <div className={classes.currentOthersData}>
        <Typography variant="subtitle2">
          Visibility {visibilityWithUnit(visibility, units)}
        </Typography>

        <Typography variant="subtitle2">UV index {uvi}</Typography>
      </div>
    </Paper>
  );
};

type AlmanacProps = {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  timezone: string;
};

const Almanac = (props: AlmanacProps) => {
  const classes = useStyles();

  const { sunrise, sunset, moonrise, moonset, moon_phase, timezone } = props;

  return (
    <Paper elevation={2} className={classes.almanac}>
      <div className={classes.almanacTime}>
        <Typography variant="subtitle2">
          <span className={classes.sunDecoration}>Sun</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i className={`wi wi-sunrise ${classes.iconSun}`} />
          {localTime(sunrise, timezone)}
        </Typography>
        <Typography variant="subtitle2">
          <i className={`wi wi-sunset ${classes.iconSun}`} />
          {localTime(sunset, timezone)}
        </Typography>
      </div>

      <div className={classes.almanacTime}>
        <Typography variant="subtitle2">
          <span className={classes.moonDecoration}>Moon</span>
          &nbsp;
          <i className={`wi wi-moonrise ${classes.iconMoon}`} />
          {localTime(moonrise, timezone)}
        </Typography>
        <Typography variant="subtitle2">
          <i className={`wi wi-moonset ${classes.iconMoon}`} />
          {localTime(moonset, timezone)}
        </Typography>
      </div>
      <MoonIcon moon_phase={moon_phase} />
    </Paper>
  );
};

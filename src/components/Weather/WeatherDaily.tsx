import { memo } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useAppSelector } from "../../store/hooks";

import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { formatDigits } from "../../utils/formatDigits";
import WeatherIcon from "./icons/WeatherIcon";
import WindIcon from "./icons/WindIcon";
import PopoverDaily from "./PopoverDaily";
import { dayWithTZ, dateWithTZ } from "../../utils/time";
import { Weather } from "../../api/types/weather";
import { precipitationWithUnit } from "../../utils/units";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  day: {
    color: "dodgerblue",
    // color: theme.palette.primary.main,
  },
  description: {
    color: "forestgreen",
    // color: theme.palette.primary.main,
  },
  temp: {
    color: theme.palette.primary.main,
  },
  pop: {
    color: theme.palette.primary.main,
  },
  precipitation: {
    color: theme.palette.primary.main,
  },
  paper: {
    padding: "0.5rem 0",
    // border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: "15px",
    backgroundColor: "rgb(255, 248, 220)",
  },
  locationContainer: {
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
  main: {
    color: theme.palette.primary.dark,
  },
  countryName: {
    sm: {
      marginLeft: "1rem",
    },
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
  iconPop: {
    color: theme.palette.primary.main,
  },
}));

const WeatherDaily = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { timezone, daily } = data as Weather;

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        {daily.map((data, i: number) => {
          const totalPrecipitation = (data?.rain || 0) + (data?.snow || 0);

          return (
            <Grid key={i} item xs={4} sm={3} md={2}>
              <PopoverDaily data={data} timezone={timezone}>
                <Paper elevation={2} className={classes.paper}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Typography
                        variant="subtitle2"
                        align="center"
                        className={classes.text}
                      >
                        {dateWithTZ(data.dt, timezone)}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        align="center"
                        className={classes.day}
                      >
                        {dayWithTZ(data.dt, timezone)}
                      </Typography>
                    </div>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      className={classes.main}
                      sx={{ marginTop: "10px" }}
                    >
                      {data.weather[0].main}
                    </Typography>
                    <WeatherIcon
                      weatherId={data.weather[0].id}
                      current={false}
                      size="2rem"
                    />
                    <Typography
                      variant="subtitle2"
                      align="center"
                      className={classes.description}
                      height="2.5rem"
                    >
                      {data.weather[0].description}
                    </Typography>

                    <Typography
                      variant="h6"
                      align="center"
                      className={classes.temp}
                    >
                      {formatDigits(data.temp.max)}/
                      {formatDigits(data.temp.min)}
                      {units === "imperial" ? (
                        <small> °F </small>
                      ) : (
                        <small> °C</small>
                      )}
                    </Typography>

                    <WindIcon
                      wind_speed={data.wind_speed}
                      wind_deg={data.wind_deg}
                      wind_gust={data?.wind_gust}
                      current={false}
                    />

                    <Typography
                      variant="subtitle2"
                      align="center"
                      className={classes.pop}
                    >
                      <i className={`wi wi-umbrella ${classes.iconPop}`} />{" "}
                      {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      className={classes.precipitation}
                    >
                      <i className={`wi wi-raindrop ${classes.iconPop}`} />{" "}
                      {precipitationWithUnit(totalPrecipitation, units)}
                    </Typography>
                  </div>
                </Paper>
              </PopoverDaily>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default memo(WeatherDaily);

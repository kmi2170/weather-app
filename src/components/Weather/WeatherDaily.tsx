import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useAppSelector } from "../../app/hooks";

import { selectWeather } from "../../features/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { formatDigits } from "../../utils/formatDigits";
import WeatherIcon from "./icons/WeatherIcon";
import WindIcon from "./icons/WindIcon";
import PopoverDaily from "./PopoverDaily";
import { localDate, localDay } from "../../utils/time";
import { Weather } from "../../api/types";

const useStyles = makeStyles((theme: Theme) => ({
  textTitle: {
    color: theme.palette.primary.dark,
  },
  text: {},
  temp: {
    color: theme.palette.primary.main,
  },
  paper: {
    padding: "0.5rem",
    border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: "15px",
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

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { timezone, daily } = data as Weather;

  return (
    <>
      <Typography variant="h6" className={classes.textTitle}>
        Daily Weather
      </Typography>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        {daily.map((data, i: number) => (
          <Grid key={i} item xs={4} sm={3} md={2}>
            <PopoverDaily data={data} timezone={timezone}>
              <Paper className={classes.paper}>
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
                      {localDay(data.dt, timezone)}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      align="center"
                      className={classes.text}
                    >
                      {localDate(data.dt, timezone)}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    {data.weather[0].main}
                  </Typography>
                  <WeatherIcon weather={data.weather} current={false} />
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    {data.weather[0].description}
                  </Typography>

                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.temp}
                  >
                    {formatDigits(data.temp.max)}/{formatDigits(data.temp.min)}
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
                    className={classes.text}
                  >
                    <i className={`wi wi-umbrella ${classes.iconPop}`} />{" "}
                    {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                  </Typography>
                </div>
              </Paper>
            </PopoverDaily>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default WeatherDaily;

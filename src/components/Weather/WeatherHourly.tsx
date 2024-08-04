import { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localDateTime } from "../../utils/time";

import {
  ChartTemps,
  ChartHumidity,
  ChartPrecipitation,
  ChartWind,
  ChartPressure,
} from "./charts";
import { Weather } from "../../api/types";

const useStyles = makeStyles((theme: Theme) => ({
  textTitle: {
    color: theme.palette.primary.dark,
  },
  text: {},
  paper: {
    padding: "1rem",
  },
  charts: {
    height: "200px",
  },
  chartsHumid: {
    height: "250px",
  },
}));

const WeatherHourly = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { hourly, timezone } = data as Weather;

  const dataTime = hourly.map(({ dt }) => localDateTime(dt, timezone));

  return (
    <>
      <Typography variant="h6" className={classes.textTitle}>
        Hourly
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" align="center" className={classes.text}>
          Hourly Forecast for 48 Hours
        </Typography>
        <div className={classes.charts}>
          <ChartTemps chartData={hourly} dataTime={dataTime} units={units} />
        </div>
        <div className={classes.chartsHumid}>
          <ChartHumidity chartData={hourly} dataTime={dataTime} />
        </div>
        <div className={classes.charts}>
          <ChartPrecipitation
            chartData={hourly}
            dataTime={dataTime}
            units={units}
          />
        </div>
        <div className={classes.charts}>
          <ChartWind chartData={hourly} dataTime={dataTime} units={units} />
        </div>
        <div className={classes.charts}>
          <ChartPressure chartData={hourly} dataTime={dataTime} units={units} />
        </div>
      </Paper>
    </>
  );
};

export default WeatherHourly;

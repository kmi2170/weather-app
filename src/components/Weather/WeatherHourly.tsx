import { useMemo } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weatherSlice";
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

const useStyles = makeStyles(() => ({
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
      <Typography variant="h6" className={classes.text}>
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

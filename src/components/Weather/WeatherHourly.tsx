import { memo } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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

const WeatherHourly = () => {
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
      <Paper
        sx={{
          padding: "1rem",
        }}
      >
        <Typography variant="subtitle1" align="center">
          Hourly Forecast for 48 Hours
        </Typography>

        <ChartTemps
          chartData={hourly}
          dataTime={dataTime}
          units={units}
          height="200px"
        />
        <ChartHumidity chartData={hourly} dataTime={dataTime} height="250px" />
        <ChartPrecipitation
          chartData={hourly}
          dataTime={dataTime}
          units={units}
        />
        <ChartWind
          chartData={hourly}
          dataTime={dataTime}
          units={units}
          height="200px"
        />
        <ChartPressure
          chartData={hourly}
          dataTime={dataTime}
          units={units}
          height="200px"
        />
      </Paper>
    </>
  );
};

export default memo(WeatherHourly);

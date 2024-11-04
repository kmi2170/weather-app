import { memo } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localDateTime, localDay } from "../../utils/time";

import {
  ChartTemps,
  ChartHumidity,
  ChartPrecipitation,
  ChartWind,
  ChartPressure,
} from "./charts";
import { Weather } from "../../api/types/weather";
import { isDay } from "../../utils/units";

const WeatherHourly = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { daily, hourly, timezone } = data as Weather;

  const sunAlmanac = daily.slice(0, 3).map((data) => {
    return [data.dt, data.sunrise, data.sunset];
  });

  const dataIsDay = hourly.map((data) => {
    const sunRiseSet = sunAlmanac.filter(
      (times) => localDay(times[0], timezone) === localDay(data.dt, timezone)
    )[0];
    const [_, sunrise, sunset] = sunRiseSet;
    const _isDay = isDay(data.dt, sunrise, sunset);

    return _isDay;
  });

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
          dataIsDay={dataIsDay}
          units={units}
          height="200px"
        />
        <ChartHumidity
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          height="250px"
        />
        <ChartPrecipitation
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
        />
        <ChartWind
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
          height="200px"
        />
        <ChartPressure
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
          height="200px"
        />
      </Paper>
    </>
  );
};

export default memo(WeatherHourly);

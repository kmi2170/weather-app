import { memo } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { dateWithTZ, dayTimeWithTZ } from "../../utils/time";

import {
  ChartTemps,
  ChartHumidity,
  ChartPrecipitation,
  ChartWind,
  ChartPressure,
} from "./charts";
import { BackGroundRages, Weather } from "../../api/types/weather";
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

  const dataTime = hourly.map(({ dt }) => dayTimeWithTZ(dt, timezone));

  const sunAlmanac = daily.slice(0, 3).map((data) => {
    return [data.dt, data.sunrise, data.sunset];
  });

  const dataIsDay = hourly.map((data) => {
    const sunRiseSet = sunAlmanac.filter(
      (times) =>
        dateWithTZ(times[0], timezone) === dateWithTZ(data.dt, timezone)
    )[0];
    const [_, sunrise, sunset] = sunRiseSet;
    const _isDay = isDay(data.dt, sunrise, sunset);

    return _isDay;
  });

  const dataNightTime = dataIsDay
    .map((isDay, i) => {
      if (i === 0 && !isDay) return dataTime[i];
      if (i === dataIsDay.length - 1 && !isDay) return dataTime[i];
      if (!isDay && (dataIsDay[i - 1] || dataIsDay[i + 1])) return dataTime[i];
      return null;
    })
    .filter((data) => data !== null);

  let nightRanges: BackGroundRages[] = [];
  for (let i = 0; i < dataNightTime.length; i += 2) {
    nightRanges.push({
      start: dataNightTime[i],
      end: dataNightTime[i + 1],
      color: "rgba(35, 42, 41, 0.1)",
    });
  }

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <ChartTemps
          chartData={hourly}
          dataTime={dataTime}
          backgroundRanges={nightRanges}
          units={units}
          height="200px"
        />
        <ChartHumidity
          chartData={hourly}
          dataTime={dataTime}
          backgroundRanges={nightRanges}
          height="250px"
        />
        <ChartPrecipitation
          chartData={hourly}
          dataTime={dataTime}
          backgroundRanges={nightRanges}
          units={units}
        />
        <ChartWind
          chartData={hourly}
          dataTime={dataTime}
          backgroundRanges={nightRanges}
          units={units}
          height="200px"
        />
        <ChartPressure
          chartData={hourly}
          dataTime={dataTime}
          backgroundRanges={nightRanges}
          units={units}
          height="200px"
        />
      </Paper>
    </>
  );
};

export default memo(WeatherHourly);

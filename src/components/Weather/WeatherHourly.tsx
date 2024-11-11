import { memo } from "react";

import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { dayTimeWithTZ } from "../../utils/time";

import {
  ChartTemps,
  ChartHumidity,
  ChartPrecipitation,
  ChartWind,
  ChartPressure,
} from "./charts";
import { BackGroundRanges, Weather } from "../../api/types/weather";

const WeatherHourly = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { lat, lon } = location;
  if (lat == null || lon == null) return;

  const { data, error } = useGetWeatherQuery({
    lat: lat.toString(),
    lon: lon.toString(),
    units,
    lang,
  });

  const { daily, hourly, timezone } = data as Weather;

  const dataTime = hourly.map(({ dt }) => dt);
  const dataTimeLabels = hourly.map(({ dt }) => dayTimeWithTZ(dt, timezone));

  const sunAlmanac = daily.slice(0, 3).map((data) => {
    return [data.dt, data.sunrise, data.sunset];
  });

  const dtStart = dataTime[0];
  const dtEnd = dataTime[dataTime.length - 1];
  const timeSpan = dtEnd - dtStart;
  const dayRanges: BackGroundRanges[] = [];
  const dayBackgroundColor = "rgba(255, 248, 220, 0.50)";
  for (let i = 0; i < sunAlmanac.length; i++) {
    const [_, sunrise, sunset] = sunAlmanac[i];
    if (sunrise < dtStart) {
      dayRanges.push({
        start: 0,
        end: (sunset - dtStart) / timeSpan,
        color: dayBackgroundColor,
      });
    } else if (sunset > dtEnd) {
      dayRanges.push({
        start: (sunrise - dtStart) / timeSpan,
        end: timeSpan,
        color: dayBackgroundColor,
      });
    } else {
      dayRanges.push({
        start: (sunrise - dtStart) / timeSpan,
        end: (sunset - dtStart) / timeSpan,
        color: dayBackgroundColor,
      });
    }
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
          dataLabel={dataTimeLabels}
          backgroundRanges={dayRanges}
          units={units}
          height="200px"
        />
        <ChartHumidity
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={dayRanges}
          height="250px"
        />
        <ChartPrecipitation
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={dayRanges}
          units={units}
          height="200px"
        />
        <ChartWind
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={dayRanges}
          units={units}
          height="200px"
        />
        <ChartPressure
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={dayRanges}
          units={units}
          height="200px"
        />
      </Paper>
    </>
  );
};

export default memo(WeatherHourly);

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
  const nightRanges: BackGroundRanges[] = [];
  for (let i = 0; i < sunAlmanac.length - 1; i++) {
    const [_, _sunrise, sunset] = sunAlmanac[i];
    const [__, sunrise, _sunset] = sunAlmanac[i + 1];

    if (i === 0 && _sunrise > dtStart) {
      nightRanges.push({
        start: 0,
        end: (_sunrise - dtStart) / timeSpan,
        color: "rgba(35, 42, 41, 0.1)",
      });
    } else if (i + 1 === sunAlmanac.length - 1 && _sunset < dtEnd) {
      nightRanges.push({
        start: (_sunset - dtStart) / timeSpan,
        end: timeSpan,
        color: "rgba(35, 42, 41, 0.1)",
      });
    }
    nightRanges.push({
      start: (sunset - dtStart) / timeSpan,
      end: (sunrise - dtStart) / timeSpan,
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
          dataLabel={dataTimeLabels}
          backgroundRanges={nightRanges}
          units={units}
          height="200px"
        />
        <ChartHumidity
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={nightRanges}
          height="200px"
        />
        <ChartPrecipitation
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={nightRanges}
          units={units}
        />
        <ChartWind
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={nightRanges}
          units={units}
          height="200px"
        />
        <ChartPressure
          chartData={hourly}
          dataLabel={dataTimeLabels}
          backgroundRanges={nightRanges}
          units={units}
          height="200px"
        />
      </Paper>
    </>
  );
};

export default memo(WeatherHourly);

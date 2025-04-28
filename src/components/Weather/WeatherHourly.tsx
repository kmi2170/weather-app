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

  const { data } = useGetWeatherQuery({
    lat: String(lat),
    lon: String(lon),
    units,
    lang,
  });

  if (!data) return;

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
  for (let i = 0; i < sunAlmanac.length; i++) {
    const [_, sunrise, sunset] = sunAlmanac[i];
    if (sunrise < dtStart) {
      dayRanges.push({
        start: 0,
        end: (sunset - dtStart) / timeSpan,
      });
    } else if (sunset > dtEnd) {
      dayRanges.push({
        start: (sunrise - dtStart) / timeSpan,
        end: timeSpan,
      });
    } else {
      dayRanges.push({
        start: (sunrise - dtStart) / timeSpan,
        end: (sunset - dtStart) / timeSpan,
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
          height="200px"
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

export default WeatherHourly;

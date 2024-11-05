import { memo } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localDay, localDayTime } from "../../utils/time";

import {
  ChartTemps,
  ChartHumidity,
  ChartPrecipitation,
  ChartWind,
  ChartPressure,
} from "./charts";
import { Weather } from "../../api/types/weather";
import { isDay } from "../../utils/units";
import { SxProps } from "@mui/material";
import theme from "../../theme/theme";

const chartBoxStyle: SxProps = {
  padding: "5px 10px",
  borderRadius: "10px",
  boxShadow: `3px 3px 3px ${theme.palette.primary.light}`,
  border: `1px solid ${theme.palette.primary.light}`,
};

const chartDarkBackground: Record<string, string | number> = {
  backgroundColor: theme.palette.primary.light,
  // backgroundColor: "rgba(0, 0, 128, 0.1)",
  barPercentage: 1,
  categoryPercentage: 0.999999,
};

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

  const dataTime = hourly.map(({ dt }) => localDayTime(dt, timezone));

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
        {/* <Typography variant="subtitle1" align="center">
          Hourly Forecast for 48 Hours
        </Typography> */}

        <ChartTemps
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
          height="200px"
          chartBoxStyle={chartBoxStyle}
          chartBackgroundProps={chartDarkBackground}
        />
        <ChartHumidity
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          height="250px"
          chartBoxStyle={chartBoxStyle}
          chartBackgroundProps={chartDarkBackground}
        />
        <ChartPrecipitation
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
          chartBoxStyle={chartBoxStyle}
          chartBackgroundProps={chartDarkBackground}
        />
        <ChartWind
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
          height="200px"
          chartBoxStyle={chartBoxStyle}
          chartBackgroundProps={chartDarkBackground}
        />
        <ChartPressure
          chartData={hourly}
          dataTime={dataTime}
          dataIsDay={dataIsDay}
          units={units}
          height="200px"
          chartBoxStyle={chartBoxStyle}
          chartBackgroundProps={chartDarkBackground}
        />
      </Paper>
    </>
  );
};

export default memo(WeatherHourly);

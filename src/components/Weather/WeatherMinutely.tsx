import { memo } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localTime } from "../../utils/time";
import { ChartMinutely } from "./charts";
import { Weather } from "../../api/types";

const WeatherMinutely = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { timezone, minutely } = data as Weather;

  const data_precipitation: number[] = minutely?.map(({ precipitation }) => {
    return units === "imperial" ? precipitation / 25.4 : precipitation;
  });

  const maxPrecipitation = Math.max(...data_precipitation);

  const dataTime = minutely?.map(({ dt }) => localTime(dt, timezone));

  const isFall = minutely?.some(({ precipitation }) => precipitation > 0);

  const unitsLabel =
    units === "imperial" ? "Precipitation [in]" : "Precipitation [mm]";

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
          height: "200px",
          paddingBottom: "50px",
        }}
      >
        <Typography variant="subtitle1" align="center">
          {isFall
            ? `Precipitation for the next 1 Hour ${unitsLabel}`
            : `No Precipitation for the next 1 Hour`}
        </Typography>
        <ChartMinutely
          chartData={data_precipitation}
          maxValue={maxPrecipitation}
          dataTime={dataTime}
          units={units}
        />
      </Paper>
    </>
  );
};

export default memo(WeatherMinutely);

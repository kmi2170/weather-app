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

  const dataTime = minutely?.map(({ dt }) => localTime(dt, timezone));

  const isFall = minutely?.some(({ precipitation }) => precipitation > 0);

  return (
    <>
      <Typography
        variant="h6"
        sx={(theme) => ({
          color: theme.palette.primary.dark,
        })}
      >
        Minutely
      </Typography>
      <Paper
        sx={{
          padding: "1rem",
          height: "220px",
          paddingBottom: "50px",
        }}
      >
        <Typography variant="subtitle1" align="center">
          {isFall
            ? "Precipitation for the next 1 Hour"
            : "No Precipitation for the next 1 Hour"}
        </Typography>
        <ChartMinutely chartData={minutely} dataTime={dataTime} units={units} />
      </Paper>
    </>
  );
};

export default WeatherMinutely;

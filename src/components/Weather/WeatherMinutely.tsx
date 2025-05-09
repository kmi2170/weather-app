import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { timeWithTZ } from "../../utils/time";
import { ChartMinutely } from "./charts";
import { Weather } from "../../api/types/weather";
import theme from "../../theme/theme";

const WeatherMinutely = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery(
    {
      lat: String(location.lat),
      lon: String(location.lon),
      units,
      lang,
    },
    { skip: !location.lat || !location.lon }
  );

  if (!data) return;

  const { timezone, minutely } = data as Weather;

  const data_precipitation: number[] =
    minutely?.map(({ precipitation }) => {
      return units === "imperial" ? precipitation / 25.4 : precipitation;
    }) || [];

  const dataTime = minutely?.map(({ dt }) => timeWithTZ(dt, timezone));

  const isFall = minutely?.some(({ precipitation }) => precipitation > 0);

  const unitsLabel =
    units === "imperial" ? "Precipitation [in]" : "Precipitation [mm]";

  return (
    <Paper
      sx={(theme) => ({
        padding: "1rem",
        [theme.breakpoints.down("sm")]: {
          height: "225px",
        },
        [theme.breakpoints.up("sm")]: {
          height: "210px",
        },
        paddingBottom: "50px",
      })}
    >
      <Typography variant="subtitle1" align="center">
        {isFall
          ? `Precipitation for the next 1 Hour ${unitsLabel}`
          : data_precipitation.length > 0
          ? `No Precipitation for the next 1 Hour`
          : "Precipitation Data is Not Available"}
      </Typography>
      <ChartMinutely
        chartData={data_precipitation}
        dataLabel={dataTime}
        units={units}
        height="150px"
      />
    </Paper>
  );
};

export default WeatherMinutely;

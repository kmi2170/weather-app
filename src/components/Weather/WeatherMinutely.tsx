import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localTime } from "../../utils/time";
import { ChartMinutely } from "./charts";
import { Weather } from "../../api/types";

const useStyles = makeStyles((theme: Theme) => ({
  textTitle: {
    color: theme.palette.primary.dark,
  },
  text: {},
  paper: {
    padding: "1rem",
  },
}));

const WeatherMinutely = () => {
  const classes = useStyles();

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
      <Typography variant="h6" className={classes.textTitle}>
        Minutely
      </Typography>
      <Paper
        className={classes.paper}
        style={{ height: 220, paddingBottom: 50 }}
      >
        <Typography variant="subtitle1" align="center" className={classes.text}>
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

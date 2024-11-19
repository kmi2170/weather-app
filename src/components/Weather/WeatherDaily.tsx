import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../store/hooks";

import { selectWeather } from "../../slice/weatherSlice";
import {
  useGetWeatherQuery,
  useGetWeatherHistoryQuery,
} from "../../services/weatherApi";
import WeatherIcon from "./icons/WeatherIcon";
import WindIcon from "./icons/WindIcon";
import PopoverDaily from "./PopoverDaily";
import {
  dayWithTZ,
  dateWithTZ,
  fullDateOfYesterdayWithTZ,
  dayOfYesterdayWithTZ,
} from "../../utils/time";
import { Weather } from "../../api/types/weather";
import { precipitationWithUnit } from "../../utils/units";
import { time } from "console";

const IconPrecipitation = styled("i")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const WeatherDaily = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { timezone, daily } = data as Weather;

  const yesterday = fullDateOfYesterdayWithTZ(daily[0].dt, timezone);

  const { data: data_yesterday } = useGetWeatherHistoryQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    date: yesterday,
    units,
    lang,
  });

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      flexWrap="wrap"
      spacing={1}
    >
      {data_yesterday && (
        <Grid
          xs={4}
          sm={3}
          md={2}
          sx={{
            display: "flex",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              padding: "0.5rem 0",
              borderRadius: "15px",
              backgroundColor: "whitesmoke",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: 1,
              mt: "2px",
              mb: "2px",
              mr: "2px",
              opacity: "0.8",
            }}
          >
            <Typography variant="h6" align="center">
              Yesterday
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ color: "dodgerblue" }}
            >
              {dayOfYesterdayWithTZ(daily[0].dt, timezone)}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                mt: "7.75rem",
              })}
            >
              {data_yesterday.temperature.max.toFixed(0)}/
              {data_yesterday.temperature.min.toFixed(0)}
              {units === "imperial" ? <small> °F </small> : <small> °C</small>}
            </Typography>

            <WindIcon
              wind_speed={data_yesterday.wind.max.speed}
              wind_deg={data_yesterday.wind.max.direction}
              current={false}
            />

            <Typography
              variant="subtitle1"
              align="center"
              sx={{ mt: "3.5rem" }}
            >
              <IconPrecipitation className={`wi wi-raindrop`} />{" "}
              {precipitationWithUnit(data_yesterday.precipitation.total, units)}
            </Typography>
          </Paper>
        </Grid>
      )}

      {daily.map((data, i: number) => {
        const totalPrecipitation = (data?.rain || 0) + (data?.snow || 0);

        return (
          <Grid key={i} xs={4} sm={3} md={2}>
            <PopoverDaily data={data} timezone={timezone} units={units}>
              <Paper
                elevation={2}
                sx={{
                  padding: "0.5rem 0",
                  borderRadius: "15px",
                  backgroundColor: "rgb(255, 248, 220)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" align="center">
                  {i === 0 ? "Today" : dateWithTZ(data.dt, timezone)}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "dodgerblue" }}
                >
                  {dayWithTZ(data.dt, timezone)}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    mt: "0.5rem",
                    mb: "1.0rem",
                    color: theme.palette.primary.dark,
                  })}
                >
                  {data.weather[0].main}
                </Typography>
                <WeatherIcon weatherId={data.weather[0].id} size="2.5rem" />
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ mt: "0.5rem", mb: "0.25rem", color: "forestgreen" }}
                >
                  {data.weather[0].description}
                </Typography>

                <Typography
                  variant="h5"
                  align="center"
                  sx={(theme) => ({ color: theme.palette.primary.main })}
                >
                  {data.temp.max.toFixed(0)}/{data.temp.min.toFixed(0)}
                  {units === "imperial" ? (
                    <small> °F </small>
                  ) : (
                    <small> °C</small>
                  )}
                </Typography>

                <WindIcon
                  wind_speed={data.wind_speed}
                  wind_deg={data.wind_deg}
                  wind_gust={data?.wind_gust}
                  current={false}
                />

                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({ color: theme.palette.primary.main })}
                >
                  <IconPrecipitation className={`wi wi-umbrella`} />{" "}
                  {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                </Typography>
                <Typography variant="h6" align="center">
                  <IconPrecipitation className={`wi wi-raindrop`} />{" "}
                  {precipitationWithUnit(totalPrecipitation, units)}
                </Typography>
              </Paper>
            </PopoverDaily>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WeatherDaily;

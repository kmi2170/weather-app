import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../store/hooks";

import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { formatDigits } from "../../utils/formatDigits";
import WeatherIcon from "./icons/WeatherIcon";
import WindIcon from "./icons/WindIcon";
import PopoverDaily from "./PopoverDaily";
import { dayWithTZ, dateWithTZ } from "../../utils/time";
import { Weather } from "../../api/types/weather";
import { precipitationWithUnit } from "../../utils/units";

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

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {daily.map((data, i: number) => {
        const totalPrecipitation = (data?.rain || 0) + (data?.snow || 0);

        return (
          <Grid key={i} item xs={4} sm={3} md={2}>
            <PopoverDaily data={data} timezone={timezone}>
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
                <Typography variant="subtitle2" align="center">
                  {dateWithTZ(data.dt, timezone)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ color: "dodgerblue" }}
                >
                  {dayWithTZ(data.dt, timezone)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={(theme) => ({
                    mt: "0.5rem",
                    mb: "0.5rem",
                    color: theme.palette.primary.dark,
                  })}
                >
                  {data.weather[0].main}
                </Typography>
                <WeatherIcon weatherId={data.weather[0].id} size="2rem" />
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ mt: "0.5rem", mb: "0.25rem", color: "forestgreen" }}
                >
                  {data.weather[0].description}
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({ color: theme.palette.primary.main })}
                >
                  {formatDigits(data.temp.max)}/{formatDigits(data.temp.min)}
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
                  variant="subtitle2"
                  align="center"
                  sx={(theme) => ({ color: theme.palette.primary.main })}
                >
                  <IconPrecipitation className={`wi wi-umbrella`} />{" "}
                  {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                </Typography>
                <Typography variant="subtitle2" align="center">
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

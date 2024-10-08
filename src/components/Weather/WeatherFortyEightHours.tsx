import { memo } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localDate, localDay, localTimeHour } from "../../utils/time";
import { Weather } from "../../api/types";
import WeatherIcon from "./icons/WeatherIcon";
import WindIcon from "./icons/WindIcon";
import { isDay, precipitationWithUnit, tempWithUnit } from "../../utils/units";

const WeatherFortyEightHours = () => {
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

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
          paddingBottom: "1.5rem",
          width: "100%",
          overflowX: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "5px",
          }}
        >
          {hourly.map((data) => {
            const sunRiseSet = sunAlmanac.filter(
              (times) =>
                localDay(times[0], timezone) === localDay(data.dt, timezone)
            )[0];
            const sunrise = sunRiseSet[1];
            const sunset = sunRiseSet[2];

            const totalPrecipitation =
              (data?.rain?.["1h"] || 0) + (data?.snow?.["1h"] || 0);

            return (
              <div
                key={data.dt}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px",
                  borderBottom: "solid",
                  borderBottomWidth: "5px",
                  borderBottomColor: isDay(data.dt, sunrise, sunset)
                    ? "rgba(255, 165, 0,0.5)"
                    : "rgba(0,0,139,0.5)",
                }}
              >
                <Typography variant="subtitle2" align="center">
                  {localDay(data.dt, timezone)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  align="center"
                >
                  {localDate(data.dt, timezone)}
                </Typography>
                <WeatherIcon
                  sunset={sunset}
                  sunrise={sunrise}
                  time={data.dt}
                  weatherId={data.weather[0].id}
                  current
                  size="1.5rem"
                />
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    width: "5rem",
                    marginBottom: "5px",
                    color: theme.palette.primary.main,
                  })}
                >
                  {tempWithUnit(data.temp, units)}
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
                  sx={{
                    marginTop: "8px",
                    marginBottom: "5px",
                    width: "5.0rem",
                  }}
                >
                  <Box
                    component="i"
                    sx={(theme) => ({ color: theme.palette.primary.main })}
                    className={`wi wi-umbrella`}
                  />{" "}
                  {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{
                    marginTop: "8px",
                    marginBottom: "5px",
                    width: "5.0rem",
                  }}
                >
                  <Box
                    component="i"
                    sx={(theme) => ({ color: theme.palette.primary.main })}
                    className={`wi wi-raindrop`}
                  />{" "}
                  {precipitationWithUnit(totalPrecipitation, units)}
                </Typography>
                <Typography variant="h6" align="center">
                  {localTimeHour(data.dt, timezone)}
                </Typography>
              </div>
            );
          })}
        </div>
      </Paper>
    </>
  );
};

export default memo(WeatherFortyEightHours);

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localDate, localDay, localTimeHour } from "../../utils/time";
import { Weather } from "../../api/types";
import WeatherIcon from "./icons/WeatherIcon";
import { isDay, tempWithUnit } from "../../utils/units";

const WeatherFortyEightHours = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { current, hourly, timezone } = data as Weather;
  const { sunrise, sunset } = current;

  return (
    <>
      <Typography
        variant="h6"
        sx={(theme) => ({
          color: theme.palette.primary.dark,
        })}
      >
        48 Hours
      </Typography>

      <Paper
        sx={{
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
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
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2px",
                    backgroundColor: isDay(data.dt, sunrise, sunset)
                      ? "rgba(224, 255, 255, 0.5)"
                      : "rgba(211, 211, 211, 0.5)",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="subtitle2" align="center">
                    {localDay(data.dt, timezone)}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" align="center">
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
                      width: "3rem",
                      color: theme.palette.primary.main,
                    })}
                  >
                    {tempWithUnit(data.temp, units)}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    sx={{ width: "4.0rem", marginBottom: "2px" }}
                  >
                    <i className={`wi wi-umbrella`} />{" "}
                    {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                  </Typography>
                  <Typography variant="h6" align="center">
                    {localTimeHour(data.dt, timezone)}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default WeatherFortyEightHours;

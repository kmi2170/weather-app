import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";

import WeatherIcon from "../icons/WeatherIcon";
import WindIcon from "../icons/WindIcon";
import { dayDateTimeWithTZ } from "../../../utils/time";
import { isDay, tempWithUnit } from "../../../utils/units";
import { Location, Units } from "../../../store/initialState";
import { WeatherCurrent } from "../../../api/types/weather";

const LocationWrapper = styled("div")(({ theme }) => ({
  mb: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  [theme.breakpoints?.down("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
  },
  alignItems: "center",
}));

const LocationSubWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
});

type CurrentMainProps = {
  location: Location;
  current: WeatherCurrent;
  timezone: string;
  units: Units;
};

const CurrentMain = (props: CurrentMainProps) => {
  const { location, current, timezone, units } = props;
  const theme = useTheme();

  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    clouds,
    weather,
    wind_speed,
    wind_deg,
    wind_gust,
  } = current;

  const { city, region, country, lat, lon } = location;

  const _isDay = isDay(dt, sunrise, sunset);

  const font_color = _isDay ? "black" : "white";
  const font_color_main = _isDay ? "black" : "pink";
  const font_color_temp = _isDay ? theme.palette.primary.main : "pink";
  const font_color_date = _isDay ? "dodgerblue" : "lightcyan";
  const icon_color = _isDay ? theme.palette.primary.main : "lightpink";
  const bg_color = _isDay ? "lightcyan" : "darkslateblue";

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg_color,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: font_color, mt: "0.5rem", ml: "2rem" }}
        >
          {dayDateTimeWithTZ(dt, timezone)}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: font_color, mt: "0.5rem", ml: "0.5rem" }}
        >
          ({timezone})
        </Typography>
      </div>

      <LocationWrapper>
        <LocationSubWrapper>
          <Typography variant="h5" sx={{ color: font_color_date }}>
            {city}
            {region && <span>,&nbsp;</span>}
          </Typography>
          <Typography variant="h6" sx={{ color: font_color_date }}>
            {region}
          </Typography>
          <Typography
            variant="h6"
            sx={(theme) => ({
              color: font_color_date,
              ml: "0.5rem",
              fontStyle: "italic",
              [theme.breakpoints?.up("sm")]: {
                ml: "1rem",
              },
            })}
          >
            {country}
          </Typography>
        </LocationSubWrapper>

        {lat && lon && (
          <Typography
            variant="subtitle2"
            sx={{ color: font_color, ml: "1rem", mt: "0.25rem" }}
          >
            lat: {lat.toFixed(3)}, lon: {lon.toFixed(3)}
          </Typography>
        )}
      </LocationWrapper>

      <Grid
        item
        container
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          borderRadius: "20px",
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ color: font_color_main, mb: "0.25rem" }}
          >
            {weather?.[0].main}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: "4rem",
            }}
          >
            <WeatherIcon
              weatherId={weather?.[0]?.id}
              size="4rem"
              iconColor={icon_color}
              isDay={_isDay}
            />
          </div>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: font_color, mt: "0.25rem" }}
          >
            {weather?.[0]?.description}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <div>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: font_color_temp }}
            >
              {tempWithUnit(temp, units)}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
              sx={{ color: font_color }}
            >
              Feels like {tempWithUnit(feels_like, units)}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={4}>
          <WindIcon
            wind_speed={wind_speed}
            wind_deg={wind_deg}
            wind_gust={wind_gust}
            current
            iconColor={icon_color}
            fontColor={font_color_temp}
          />
        </Grid>

        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="center"
          sx={{ color: font_color, width: "100%", mb: "1rem" }}
        >
          Cloud Cover {clouds} %
        </Typography>
      </Grid>
    </Paper>
  );
};

export default CurrentMain;
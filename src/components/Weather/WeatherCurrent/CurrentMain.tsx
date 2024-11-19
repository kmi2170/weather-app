import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import WeatherIcon from "../icons/WeatherIcon";
import WindIcon from "../icons/WindIcon";
import { dayDateTimeWithTZ } from "../../../utils/time";
import { isDay, tempWithUnit } from "../../../utils/units";
import { Location, Units } from "../../../store/initialState";
import { WeatherCurrent } from "../../../api/types/weather";

const DateTimeWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: "1rem",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "1rem",
  },
  alignItems: "center",
}));

const LocationWrapper = styled("div")(({ theme }) => ({
  margin: "1rem 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
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
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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
        p: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg_color,
      }}
    >
      <DateTimeWrapper>
        <Typography variant="h5" sx={{ color: font_color }}>
          {dayDateTimeWithTZ(dt, timezone)}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: font_color }}>
          ({timezone})
        </Typography>
      </DateTimeWrapper>

      <LocationWrapper>
        <LocationSubWrapper>
          <Typography variant="h4" sx={{ color: font_color_date }}>
            {city}
            {region && <span>,&nbsp;</span>}
          </Typography>
          <Typography variant="h5" sx={{ color: font_color_date }}>
            {region}
          </Typography>
        </LocationSubWrapper>

        <Typography
          variant="h5"
          sx={{
            mt: "0.5rem",
            mb: "0.25rem",
            color: font_color_date,
            fontStyle: "italic",
          }}
        >
          {country}
        </Typography>

        {lat && lon && (
          <Typography
            variant="subtitle1"
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
            variant="h5"
            align="center"
            sx={{ color: font_color_main, mb: "0.75rem" }}
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
              size="3.75rem"
              iconColor={icon_color}
              isDay={_isDay}
            />
          </div>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: font_color, mt: "1.5rem" }}
          >
            {weather?.[0]?.description}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <div>
            <Typography
              variant="h3"
              align="center"
              sx={{ color: font_color_temp }}
            >
              {tempWithUnit(temp, units)}
            </Typography>
            <Typography
              variant={isXs ? "subtitle2" : "h6"}
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
          variant="h6"
          align="center"
          sx={{ color: font_color, width: "100%" }}
        >
          Cloudiness {clouds} %
        </Typography>
      </Grid>
    </Paper>
  );
};

export default CurrentMain;

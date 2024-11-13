import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useAppSelector } from "../../store/hooks";
import { precipitationWithUnit, pressureWithUnit } from "../../utils/units";
import MoonPhaseWithIcon from "./icons/MoonPhaseWithIcon";
import { dayWithTZ, dateWithTZ, timeWithTZ } from "../../utils/time";
import { WeatherDaily } from "../../api/types/weather";
import {
  AlmanacWrapper,
  IconMoon,
  IconSun,
  MoonLabel,
  SunLabel,
} from "./WeatherCurrent/Almanac";

const PopoverWrapper = styled("div")(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: "15px",
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "15px",
  },
}));

interface PopoverDailyProps {
  children: React.ReactNode;
  data: WeatherDaily;
  timezone: string;
}

const PopoverDaily = ({ children, data, timezone }: PopoverDailyProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const units = useAppSelector((state) => state.weather.units);

  const {
    summary,
    clouds,
    humidity,
    pressure,
    uvi,
    rain,
    snow,
    sunrise,
    sunset,
    moonrise,
    moonset,
    moon_phase,
    temp,
  } = data;

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <PopoverWrapper
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </PopoverWrapper>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        transitionDuration={{ enter: 1000 }}
        sx={{ pointerEvents: "none" }}
      >
        <Container
          maxWidth="xs"
          sx={{ backgroundColor: "lightcyan", pt: "1rem", pb: "1rem" }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {dateWithTZ(data.dt, timezone)} {dayWithTZ(data.dt, timezone)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {summary && (
              <Typography
                variant="h6"
                sx={(theme) => ({
                  marginTop: "10px",
                  marginBottom: "25px",
                  width: "100%",
                  color: theme.palette.primary.dark,
                })}
              >
                {summary}
              </Typography>
            )}
          </Grid>
          <Grid container alignItems="center">
            <Grid item container xs={12} spacing={4}>
              {["morn", "day", "eve", "night"].map((item) => (
                <Grid
                  item
                  key={item}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignIterator: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {item}
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                    })}
                  >
                    {Number(temp[item]).toFixed(0)}
                    {units === "imperial" ? (
                      <small> °F </small>
                    ) : (
                      <small> °C</small>
                    )}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12}>
              {rain && (
                <Typography variant="subtitle2">
                  Rain {precipitationWithUnit(rain, units)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {snow && (
                <Typography variant="subtitle2">
                  Snow {precipitationWithUnit(snow, units)}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  Cloud Cover {clouds} %
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  Humidity {humidity} %
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  Pressure {pressureWithUnit(pressure, units)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">UV index {uvi}</Typography>
              </Grid>

              <AlmanacWrapper sx={{ mt: "0.5rem" }}>
                <SunLabel>Sun</SunLabel>
                <Typography variant="subtitle2">
                  <IconSun className="wi wi-sunrise" />
                  {timeWithTZ(sunrise, timezone)}
                </Typography>
                <Typography variant="subtitle2">
                  <IconSun className="wi wi-sunset" />
                  {timeWithTZ(sunset, timezone)}
                </Typography>
              </AlmanacWrapper>

              <AlmanacWrapper>
                <MoonLabel>Moon</MoonLabel>
                <Typography variant="subtitle2">
                  <IconMoon className={`wi wi-moonrise`} />
                  {timeWithTZ(moonrise, timezone)}
                </Typography>
                <Typography variant="subtitle2">
                  <IconMoon className={`wi wi-moonset`} />
                  {timeWithTZ(moonset, timezone)}
                </Typography>
              </AlmanacWrapper>
            </Grid>
            <MoonPhaseWithIcon moon_phase={moon_phase} />
          </Grid>
        </Container>
      </Popover>
    </>
  );
};

export default PopoverDaily;

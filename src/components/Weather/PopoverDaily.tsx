import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { createTheme, Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { purple, orange, yellow } from "@mui/material/colors";

import { useAppSelector } from "../../app/hooks";
import { fallWithUnit, pressureWithUnit } from "../../utils/units";
import MoonIcon from "./icons/MoonIcon";
import { localTime } from "../../utils/time";
import { WeatherDaily } from "../../api/types";
import { formatDigits } from "../../utils/formatDigits";

const theme = createTheme();

const useStyles = makeStyles(() =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme?.spacing(1),
      minWidth: "30vw",
    },
    iconSun: {
      fontSize: "1rem",
      color: purple[500],
      marginRight: "0.5rem",
    },
    iconMoon: {
      fontSize: "1rem",
      color: purple[500],
      marginRight: "0.5rem",
      marginLeft: "0.25rem",
    },
    children: {
      "&:hover": { border: `1px solid ${purple[500]}` },
    },
    sunDecoration: {
      borderBottom: `2px solid ${orange[500]}`,
    },
    moonDecoration: {
      borderBottom: `2px solid ${yellow[500]}`,
    },
    tempChange: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alighIterator: "center",
      marginBottom: "0.5rem",
    },
    tempChangeName: {
      textTransform: "capitalize",
    },
  })
);

interface PopoverDailyProps {
  children: React.ReactChild;
  data: WeatherDaily;
  timezone: string;
}

const PopoverDaily = ({ children, data, timezone }: PopoverDailyProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const units = useAppSelector((state) => state.weather.units);

  const {
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
      <div
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.children}
      >
        {children}
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
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
        transitionDuration={{ enter: 3000 }}
      >
        <Container maxWidth="xs">
          <Grid container alignItems="center">
            <Grid item container xs={12} spacing={4}>
              {["morn", "day", "eve", "night"].map((item) => (
                <Grid item key={item} className={classes.tempChange}>
                  <div className={classes.tempChangeName}>{item}</div>
                  <div>
                    {formatDigits(temp[item] as number)}
                    {units === "imperial" ? (
                      <small>&#8457;</small>
                    ) : (
                      <small>&#8451;</small>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12}>
              {rain && (
                <Typography variant="subtitle2">
                  Rain {fallWithUnit(rain, units)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {snow && (
                <Typography variant="subtitle2">
                  Snow {fallWithUnit(snow, units)}
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

              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  <span className={classes.sunDecoration}>Sun</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i className={`wi wi-sunrise ${classes.iconSun}`} />
                  {localTime(sunrise, timezone)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  <i className={`wi wi-sunset ${classes.iconSun}`} />
                  {localTime(sunset, timezone)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  <span className={classes.moonDecoration}>Moon</span>
                  &nbsp;
                  <i className={`wi wi-moonrise ${classes.iconMoon}`} />
                  {localTime(moonrise, timezone)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  <i className={`wi wi-moonset ${classes.iconMoon}`} />
                  {localTime(moonset, timezone)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <MoonIcon moon_phase={moon_phase} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Popover>
    </>
  );
};

export default PopoverDaily;

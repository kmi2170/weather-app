import { useState } from "react";

import { Container, Grid, Popover, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import moment from "moment-timezone";

import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weatherSlice";

import MoonIcon from "./MoonIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
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
  })
);

interface PopoverDailyProps {
  children: React.ReactNode;
  data: any;
}

const PopoverDaily: React.FC<PopoverDailyProps> = ({ children, data }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { units, weatherOnecall } = useAppSelector(selectWeather);
  const { timezone } = weatherOnecall;

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
  } = data;

  const fallWithUnit = (fall: string) =>
    units === "imperial" ? `${formatDigits(+fall / 25.4, 2)} in` : `${fall} mm`;

  const timeLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format("h:mm a");

  const formatDigits = (x: string | number, d: number) =>
    x !== undefined && x !== null
      ? (+x).toLocaleString("en-US", {
          maximumFractionDigits: d,
          minimumFractionDigits: d,
        })
      : "N/A";

  const pressureWithUnit = (p: string) =>
    units === "imperial"
      ? `${formatDigits((+p / 1013.25) * 29.921, 1)} inHg`
      : `${p} hPa`;

  // const visibilityWithUnit = (v: string) =>
  //   units === 'imperial'
  //     ? `${formatDigits(+v / 10000 / 1.609344, 1)} mi`
  //     : `${formatDigits(+v / 1000, 1)} km`;

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
            <Grid item xs={12}>
              {rain && (
                <Typography variant="subtitle2">
                  Rain {fallWithUnit(rain)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {snow && (
                <Typography variant="subtitle2">
                  Snow {fallWithUnit(snow)}
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
                  Pressure {pressureWithUnit(pressure)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">UV index {uvi}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  Sun &nbsp;&nbsp;&nbsp;&nbsp;
                  <i className={`wi wi-sunrise ${classes.iconSun}`} />
                  {timeLocalwithTZ(sunrise, timezone)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  <i className={`wi wi-sunset ${classes.iconSun}`} />
                  {timeLocalwithTZ(sunset, timezone)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  Moon &nbsp;
                  <i className={`wi wi-moonrise ${classes.iconMoon}`} />
                  {timeLocalwithTZ(moonrise, timezone)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  <i className={`wi wi-moonset ${classes.iconMoon}`} />
                  {timeLocalwithTZ(moonset, timezone)}
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

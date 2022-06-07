import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { purple, orange, yellow } from '@material-ui/core/colors';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherQuery } from '../../services/weatherApi';

import { fallWithUnit, pressureWithUnit } from '../../utils/units';
import MoonIcon from './common/MoonIcon';
import { localTime } from '../../utils/time';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
      minWidth: '30vw',
    },
    iconSun: {
      fontSize: '1rem',
      color: purple[500],
      marginRight: '0.5rem',
    },
    iconMoon: {
      fontSize: '1rem',
      color: purple[500],
      marginRight: '0.5rem',
      marginLeft: '0.25rem',
    },
    children: {
      '&:hover': { border: `1px solid ${purple[500]}` },
    },
    sunDecoration: {
      borderBottom: `2px solid ${orange[500]}`,
    },
    moonDecoration: {
      borderBottom: `2px solid ${yellow[500]}`,
    },
  })
);

interface PopoverDailyProps {
  children: React.ReactNode;
  data: any;
}

const PopoverDaily = ({ children, data }: PopoverDailyProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });
  const { timezone } = weatherOnecall;
  console.log('popover');

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
        aria-owns={open ? 'mouse-over-popover' : undefined}
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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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

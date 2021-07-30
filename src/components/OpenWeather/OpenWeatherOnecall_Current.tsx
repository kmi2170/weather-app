import { useState, useEffect, useContext } from 'react';
//import Image from 'next/image';

import { Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

// import moment from 'moment';
import moment from 'moment-timezone';

import { WeatherContext } from '../../reducer/reducer';
import WeatherIcon from './WeatherIcon';
import WindIcon from './WindIcon';
import MoonIcon from './MoonIcon';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    alignItems: 'center',
  },
  locationSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  weatherContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  countryName: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '1rem',
    },
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
}));

const OpenWeatherOnecall_Current: React.FC = () => {
  const classes = useStyles();

  const { state } = useContext(WeatherContext);

  const { timezone, current, daily } = state.weatherOnecall;
  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    clouds,
    uvi,
    visibility,
    rain,
    snow,
    weather,
    wind_speed,
    wind_deg,
    wind_gust,
  } = current;
  const { moonrise, moonset, moon_phase } = daily[0];

  const { city, state: state_name, country_name } = state.location;

  const formatDigits = (x: string | number, d: number) =>
    x !== undefined && x !== null
      ? (+x).toLocaleString('en-US', {
          maximumFractionDigits: d,
          minimumFractionDigits: d,
        })
      : 'N/A';

  const tempWithUnit = (t: string) =>
    state.units === 'imperial' ? (
      <span>
        {formatDigits(t, 0)}
        <small>&#8457;</small>
      </span>
    ) : (
      <span>
        {formatDigits(t, 0)}
        <small>&#8451;</small>
      </span>
    );

  const fallWithUnit = (fall: string) =>
    state.units === 'imperial'
      ? `${formatDigits(+fall / 25.4, 1)} in`
      : `${fall} mm`;

  const pressureWithUnit = (p: string) =>
    state.units === 'imperial'
      ? `${formatDigits((+p / 1013.25) * 29.921, 1)} inHg`
      : `${p} hPa`;

  const visibilityWithUnit = (v: string) =>
    state.units === 'imperial'
      ? `${formatDigits(+v / 10000 / 1.609344, 1)} mi`
      : `${formatDigits(+v / 1000, 1)} km`;

  // const timeLocalwithTZOffset = (dt: string, t_offset: string) =>
  //   moment(new Date(+dt * 1000 + +t_offset).toUTCString()).format('H:MM a');

  const timeLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format('h:mm a');

  return (
    <Paper style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" className={classes.text}>
          Current Weather
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          className={classes.text}
          style={{ marginLeft: '1rem' }}
        >
          {moment.utc(new Date(dt * 1000).toUTCString()).fromNow()}
        </Typography>
      </div>

      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <div className={classes.locationContainer}>
            <div className={classes.locationSubContainer}>
              <Typography variant="h5" className={classes.text}>
                {city},&nbsp;
              </Typography>
              <Typography variant="h6" className={classes.text}>
                {state_name}
              </Typography>
            </div>

            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.countryName}
              style={{ fontStyle: 'italic' }}
            >
              {country_name}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} container alignItems="center">
          <Grid item xs={4}>
            <div className={classes.weatherContainer}>
              <Typography variant="h6" align="center">
                {weather[0].main}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* 
                  <Image src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].icon} width={50} height={50} layout="fixed" />
                */}
                <WeatherIcon
                  sunrise={sunrise}
                  sunset={sunset}
                  weather={weather}
                  current
                />
              </div>
              <Typography variant="subtitle2" align="center">
                {weather[0].description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Typography variant="h4" align="center">
                {tempWithUnit(temp)}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
              >
                Feels like {tempWithUnit(feels_like)}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <WindIcon
              wind_speed={wind_speed}
              wind_deg={wind_deg}
              wind_gust={wind_gust}
              current
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
            >
              Cloud Cover {clouds} %
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} container>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Humidity {humidity} %</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Pressure {pressureWithUnit(pressure)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Visibility {visibilityWithUnit(visibility)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">UV index {uvi}</Typography>
          </Grid>

          <Grid item xs={12}>
            {rain && rain['1h'] && (
              <Typography variant="subtitle2">
                Rain (Last 1 hour), {fallWithUnit(rain['1h'])}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {snow && snow['1h'] && (
              <Typography variant="subtitle2">
                Snow (Last 1 hour), {fallWithUnit(snow['1h'])}
              </Typography>
            )}
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
    </Paper>
  );
};

export default OpenWeatherOnecall_Current;
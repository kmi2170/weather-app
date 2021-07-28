import { useState, useEffect, useContext } from 'react';
//import Image from 'next/image';

import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import moment from 'moment';
import moment from 'moment-timezone';

import { WeatherContext } from '../../reducer/reducer';
import WeatherIcon from './WeatherIcon';
import Preview from '../Preview';

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
}));

const OpenWeatherOnecall_Current: React.FC = () => {
  const classes = useStyles();

  const { state } = useContext(WeatherContext);

  const { timezone, current } = state.weatherOnecall;
  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    clouds,
    wind_speed,
    wind_deg,
    wind_gust,
    uvi,
    visibility,
    rain,
    snow,
    weather,
  } = current;

  const { city, state: state_name, country_name } = state.location;

  const tempWithUnit = (t: string) =>
    state.units === 'imperial' ? (
      <span>
        {(+t).toLocaleString('en-US', { maximumFractionDigits: 0 })}
        &#8457;
      </span>
    ) : (
      <span>
        {(+t).toLocaleString('en-US', { maximumFractionDigits: 0 })} &#8451;
      </span>
    );

  const speedUnit = () => (state.units === 'imperial' ? 'mi/h' : 'm/s');

  const fallWithUnit = (fall: string) =>
    state.units === 'imperial' ? `${+fall / 25.4} in` : `${fall} mm`;

  const pressureWithUnit = (p: string) =>
    state.units === 'imperial'
      ? `${((+p / 1013.25) * 29.921).toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })} inHg`
      : `${p} hPa`;

  const visibilityWithUnit = (v: string) =>
    state.units === 'imperial'
      ? `${(+v / 10000 / 1.609344).toLocaleString('en-US', {
          maximumFractionDigits: 1,
        })} mi`
      : `${(+v / 1000).toLocaleString('en-US', {
          maximumFractionDigits: 1,
        })} km`;

  // const timeLocalwithTZOffset = (dt: string, t_offset: string) =>
  //   moment(new Date(+dt * 1000 + +t_offset).toUTCString()).format('H:MM a');

  const timeLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format('h:mm a');

  return (
    <>
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

        <Grid container justifyContent="center" alignItems="center" spacing={2}>
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
            <Grid item xs={6}>
              <div className={classes.weatherContainer}>
                <Typography variant="subtitle1" align="center">
                  {weather[0].main}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* 
                  <Image
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].icon}
                    width={50}
                    height={50}
                    layout="fixed"
                  />
                */}
                  <WeatherIcon />
                </div>
                <Typography variant="subtitle2" align="center">
                  {weather[0].description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={12}>
              <div>
                Wind {wind_speed} {speedUnit()},&nbsp;&nbsp; Direction{' '}
                {wind_deg} deg.
              </div>
            </Grid>
            <Grid item xs={12}>
              {wind_gust && (
                <div>
                  Wind Gust {wind_gust} {speedUnit()}
                </div>
              )}
            </Grid>

            <Grid item xs={7}>
              <div>Pressure {pressureWithUnit(pressure)}</div>
            </Grid>
            <Grid item xs={5}>
              <div>Humidity {humidity} %</div>
            </Grid>

            <Grid item xs={6}>
              <div>Visibility {visibilityWithUnit(visibility)}</div>
            </Grid>
            <Grid item xs={6}>
              <div>UV index {uvi}</div>
            </Grid>

            <Grid item xs={12}>
              {rain && rain['1h'] && (
                <div>Rain (Last 1 hour), {fallWithUnit(rain['1h'])}</div>
              )}
            </Grid>
            <Grid item xs={12}>
              {snow && snow['1h'] && (
                <div>Snow (Last 1 hour), {fallWithUnit(snow['1h'])}</div>
              )}
            </Grid>
            <Grid item xs={6}>
              <div>Sunrise {timeLocalwithTZ(sunrise, timezone)}</div>
            </Grid>
            <Grid item xs={6}>
              <div>Sunset {timeLocalwithTZ(sunset, timezone)}</div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Preview data={state.weatherOnecall} />
    </>
  );
};

export default OpenWeatherOnecall_Current;

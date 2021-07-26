import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

import { Typography, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import moment from 'moment';

import { WeatherContext, actionTypes } from '../reducer/reducer';
import Preview from './Preview';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const OpenWeatherCurrent: React.FC<any> = ({ weatherCurrent }) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(WeatherContext);

  const {
    weather,
    dt,
    main,
    wind,
    clouds,
    sys,
    rain,
    snow,
  } = state.weatherCurrent;

  const tempUnits = () =>
    state.units === 'imperial' ? <span>&#8457;</span> : <span>&#8451;</span>;

  const speedUnits = () => (state.units === 'imperial' ? 'mi/h' : 'm/s');

  const fallUnits = (fall: string) =>
    state.units === 'imperial' ? `${+fall / 25.4} in` : `${fall} mm`;

  const timeLocal = (dt: string, t_zone: string) =>
    moment(
      new Date(+dt * 1000).toLocaleString('en-US', { timeZone: t_zone })
    ).format('HH:MM a');

  return (
    <>
      {state.timezone && (
        <div>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.text} gutterBottom>
                Current Weather
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'cener',
                }}
              >
                <Typography variant="h5" className={classes.text}>
                  {state.city}, {state.state}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.text}
                  style={{ marginLeft: '1rem' }}
                >
                  {state.country_name}
                </Typography>
              </div>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.text}
              >
                {moment.utc(new Date(dt * 1000).toUTCString()).fromNow()}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              {weather[0].main} {weather[0].description}
            </div>
            <Image
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].icon}
              width={50}
              height={50}
            />
            <div>
              {main.temp} {tempUnits()}
            </div>
            <div>
              Feels like {main.feels_like} {tempUnits()}
            </div>
            <div>Humidity {main.humidity} %</div>
            <div>
              Wind {wind.speed} {speedUnits()} {wind.deg} deg.
            </div>
            {wind.gust && (
              <div>
                Wind Gust {wind.gust} {speedUnits()}
              </div>
            )}
            <div>Sunrise {timeLocal(sys.sunrise, state.timezone)}</div>
            <div>Sunset {timeLocal(sys.sunset, state.timezone)}</div>
            <div>Clouds {clouds.all} %</div>
            {rain && rain['1h'] && (
              <div>Rain (Last 1 hour), {fallUnits(rain['1h'])}</div>
            )}
            {snow && snow['1h'] && (
              <div>Snow (Last 1 hour), {fallUnits(snow['1h'])}</div>
            )}
            <div></div>
          </Grid>
        </div>
      )}
      <Preview data={weatherCurrent} />
    </>
  );
};

export default OpenWeatherCurrent;

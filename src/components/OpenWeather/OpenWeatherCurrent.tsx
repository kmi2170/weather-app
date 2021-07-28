import { useContext } from 'react';
import Image from 'next/image';

import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import moment from 'moment';

import { WeatherContext } from '../../reducer/reducer';
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

const OpenWeatherCurrent: React.FC = () => {
  const classes = useStyles();

  const { state } = useContext(WeatherContext);

  const {
    weather,
    dt,
    main,
    wind,
    clouds,
    sys,
    rain,
    snow,
    timezone: timezoneOffset,
  } = state.weatherCurrent;

  const { city, state: state_name, country_name, timezone } = state.location;

  const tempUnits = () =>
    state.units === 'imperial' ? <span>&#8457;</span> : <span>&#8451;</span>;

  const speedUnits = () => (state.units === 'imperial' ? 'mi/h' : 'm/s');

  const fallWithUnits = (fall: string) =>
    state.units === 'imperial' ? `${+fall / 25.4} in` : `${fall} mm`;

  const pressureWithUnits = (p: string) =>
    state.units === 'imperial'
      ? `${((+p / 1013.25) * 29.921).toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })} inHg`
      : `${p} hPa`;

  const timeLocalwithTZOffset = (dt: string, t_offset: string) =>
    moment(new Date(+dt * 1000 + +t_offset).toUTCString()).format('H:MM a');

  // const timeLocal = (dt: string, t_zone: string) =>
  //   moment(
  //     new Date(+dt * 1000).toLocaleString('en-US', { timeZone: t_zone })
  //   ).format('H:MM a');
  //
  return (
    <>
      {timezoneOffset && (
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

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
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
                    <Image
                      src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                      alt={weather[0].icon}
                      width={50}
                      height={50}
                      layout="fixed"
                    />
                  </div>
                  <Typography variant="subtitle2" align="center">
                    {weather[0].description}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography variant="h5" align="center">
                    {main.temp} {tempUnits()}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    align="center"
                  >
                    Feels like {main.feels_like} {tempUnits()}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  align="center"
                >
                  Cloud Cover {clouds.all} %
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} container>
              <Grid item xs={12}>
                <div>
                  Wind {wind.speed} {speedUnits()},&nbsp;&nbsp; Direction{' '}
                  {wind.deg} deg.
                </div>
              </Grid>
              <Grid item xs={12}>
                {wind.gust && (
                  <div>
                    Wind Gust {wind.gust} {speedUnits()}
                  </div>
                )}
              </Grid>

              <Grid item xs={7}>
                <div>Pressure {pressureWithUnits(main.pressure)}</div>
              </Grid>
              <Grid item xs={5}>
                <div>Humidity {main.humidity} %</div>
              </Grid>
              <Grid item xs={12}>
                {rain && rain['1h'] && (
                  <div>Rain (Last 1 hour), {fallWithUnits(rain['1h'])}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                {snow && snow['1h'] && (
                  <div>Snow (Last 1 hour), {fallWithUnits(snow['1h'])}</div>
                )}
              </Grid>
              <Grid item xs={6}>
                <div>
                  Sunrise {timeLocalwithTZOffset(sys.sunrise, timezoneOffset)}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  Sunset {timeLocalwithTZOffset(sys.sunset, timezoneOffset)}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Preview data={state.weatherCurrent} />
    </>
  );
};

export default OpenWeatherCurrent;

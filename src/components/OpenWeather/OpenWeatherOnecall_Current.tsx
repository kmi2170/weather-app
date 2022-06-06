//import Image from 'next/image';

import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { purple, yellow, orange } from '@material-ui/core/colors';

import moment from 'moment-timezone';
import data from 'country-region-data';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherOnecallQuery } from '../../services/weatherOnecallApi';

import {
  tempWithUnit,
  fallWithUnit,
  pressureWithUnit,
  visibilityWithUnit,
  timeLocalwithTZ,
} from '../../utils/units';
import WeatherIcon from './common/WeatherIcon';
import WindIcon from './common/WindIcon';
import MoonIcon from './common/MoonIcon';

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
  country: {
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
  sunDecoration: {
    borderBottom: `2px solid ${orange[500]}`,
  },
  moonDecoration: {
    borderBottom: `2px solid ${yellow[500]}`,
  },
}));

const OpenWeatherOnecall_Current: React.FC = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });
  const { timezone, current, daily } = weatherOnecall;

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

  const { city, region, country } = location;

  const countryData = data.filter(el => el.countryShortCode === country);
  const countryName = countryData.length ? countryData[0].countryName : country;
  const regionData = countryData[0].regions.filter(
    el => el.shortCode === region
  );
  const regionName = regionData.length ? regionData[0].name : region;
  // console.log(countryData[0].countryName);
  // console.log(regionData[0].name);

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Current
      </Typography>
      <Paper style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.text}
            style={{ marginLeft: '1rem' }}
          >
            {/* {moment.utc(new Date(dt * 1000)).fromNow()} */}
            {moment
              .utc(new Date(dt * 1000))
              .local()
              .format('ddd M/DD h:mm A')}
          </Typography>
        </div>

        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <div className={classes.locationContainer}>
              <div className={classes.locationSubContainer}>
                <Typography variant="h5" className={classes.text}>
                  {city}
                  {regionName && <span>,&nbsp;</span>}
                </Typography>
                <Typography variant="h6" className={classes.text}>
                  {regionName}
                </Typography>
              </div>

              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.country}
                style={{ fontStyle: 'italic' }}
              >
                {countryName}
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
                  {tempWithUnit(temp, units)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  align="center"
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
                Pressure {pressureWithUnit(pressure, units)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Visibility {visibilityWithUnit(visibility, units)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">UV index {uvi}</Typography>
            </Grid>

            <Grid item xs={12}>
              {rain &&
                rain['1h'] && (
                  <Typography variant="subtitle2">
                    Rain (Last 1 hour), {fallWithUnit(rain['1h'], units)}
                  </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
              {snow &&
                snow['1h'] && (
                  <Typography variant="subtitle2">
                    Snow (Last 1 hour), {fallWithUnit(snow['1h'], units)}
                  </Typography>
                )}
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <span className={classes.sunDecoration}>Sun</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
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
                <span className={classes.moonDecoration}>Moon</span>
                &nbsp;
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
    </>
  );
};

export default OpenWeatherOnecall_Current;

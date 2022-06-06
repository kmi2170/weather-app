//import Image from 'next/image';

import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

// import moment from 'moment';
import moment from 'moment-timezone';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherOnecallQuery } from '../../services/weatherOnecallApi';

import { formatDigits } from '../../utils/units';
import WeatherIcon from './common/WeatherIcon';
import WindIcon from './common/WindIcon';
import PopoverDaily from './Popover_Daily';

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
  iconPop: {
    color: purple[500],
  },
}));

const OpenWeatherOnecall_Daily: React.FC = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  const { timezone, daily } = weatherOnecall;

  const tempUnit = () =>
    units === 'imperial' ? <small>&#8457;</small> : <small>&#8451;</small>;

  const temp = (t: string) =>
    units === 'imperial' ? formatDigits(t, 0) : formatDigits(t, 0);

  const dateLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format('M/D');

  const dayLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format('ddd');

  return (
    <>
      <Typography variant="subtitle1" className={classes.text}>
        Daily Weather
      </Typography>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        {daily.map((el: any, i: number) => (
          <Grid key={i} item xs={4} sm={3} md={2}>
            <PopoverDaily data={el}>
              <Paper style={{ padding: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      className={classes.text}
                    >
                      {dayLocalwithTZ(el.dt, timezone)}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      align="center"
                      className={classes.text}
                    >
                      {dateLocalwithTZ(el.dt, timezone)}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    {el.weather[0].main}
                  </Typography>
                  <WeatherIcon weather={el.weather} current={false} />
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    {el.weather[0].description}
                  </Typography>

                  <Typography variant="h6" align="center">
                    {temp(el.temp.max)}/{temp(el.temp.min)}
                    {tempUnit()}
                  </Typography>

                  <WindIcon
                    wind_speed={el.wind_speed}
                    wind_deg={el.wind_deg}
                    wind_gust={el.wind_gust}
                    current={false}
                  />

                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    <i className={`wi wi-umbrella ${classes.iconPop}`} />{' '}
                    {el.pop}%
                  </Typography>
                </div>
              </Paper>
            </PopoverDaily>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OpenWeatherOnecall_Daily;

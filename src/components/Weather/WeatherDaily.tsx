import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherQuery } from '../../services/weatherApi';
import { formatDigits } from '../../utils/formatDigits';
import WeatherIcon from './common/WeatherIcon';
import WindIcon from './common/WindIcon';
import PopoverDaily from './PopoverDaily';
import { localDate, localDay } from '../../utils/time';

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

const WeatherDaily = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: { timezone, daily } } = useGetWeatherQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

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
        {daily.map((data: any, i: number) => (
          <Grid key={i} item xs={4} sm={3} md={2}>
            <PopoverDaily data={data} timezone={timezone}>
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
                      {localDay(data.dt, timezone)}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      align="center"
                      className={classes.text}
                    >
                      {localDate(data.dt, timezone)}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    {data.weather[0].main}
                  </Typography>
                  <WeatherIcon weather={data.weather} current={false} />
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    {data.weather[0].description}
                  </Typography>

                  <Typography variant="h6" align="center">
                    {formatDigits(data.temp.max)}/{formatDigits(data.temp.min)}
                    {units === 'imperial' ? (
                      <small>&#8457;</small>
                    ) : (
                      <small>&#8451;</small>
                    )}
                  </Typography>

                  <WindIcon
                    wind_speed={data.wind_speed}
                    wind_deg={data.wind_deg}
                    wind_gust={data.wind_gust}
                    current={false}
                  />

                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.text}
                  >
                    <i className={`wi wi-umbrella ${classes.iconPop}`} />{' '}
                    {data.pop}%
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

export default WeatherDaily;

import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherQuery } from '../../services/weatherApi';
import { localTime } from '../../utils/time';
import { ChartMinutely } from './charts';

const useStyles = makeStyles(() => ({
  text: {},
  paper: {
    padding: '1rem',
  },
}));

const WeatherMinutely = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const {
    data: { timezone, minutely },
  } = useGetWeatherQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });
  console.log(minutely);

  const dataTime = useMemo(
    () => minutely?.map(({ dt }) => localTime(dt, timezone)),
    [minutely, timezone]
  );

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Minutely
      </Typography>
      <Paper className={classes.paper} style={{ height: 150 }}>
        <ChartMinutely chartData={minutely} dataTime={dataTime} units={units} />
      </Paper>
    </>
  );
};

export default WeatherMinutely;

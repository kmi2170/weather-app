import { useContext } from 'react';
import { WeatherContext } from '../../reducer/reducer';

import { Grid, Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { arr_wind_deg } from '../../utils/wind';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: purple[500],
  },
}));

interface WindIconProps {
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  current: boolean;
}

const WindIcon: React.FC<WindIconProps> = ({
  wind_speed,
  wind_deg,
  wind_gust,
  current,
}) => {
  const classes = useStyles();

  const { state } = useContext(WeatherContext);
  // const { wind_speed, wind_gust, wind_deg } = state.weatherOnecall.current;

  const speedUnit = () => (state.units === 'imperial' ? 'mi/h' : 'm/s');

  const windDirection = () => {
    const n_direction = Math.floor((wind_deg + 11.25) / 22.5);

    const direction =
      n_direction === 16 ? arr_wind_deg[0] : arr_wind_deg[n_direction];

    return direction.toUpperCase();
  };

  const iconClass = () => {
    const n_direction = Math.floor((wind_deg + 11.25) / 22.5);

    const direction =
      n_direction === 16 ? arr_wind_deg[0] : arr_wind_deg[n_direction];

    return `wi wi-wind wi-from-${direction} ${classes.icon}`;
  };

  const formatDigits = (x: number) =>
    x !== undefined && x !== null
      ? (+x).toLocaleString('en-US', {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        })
      : 'N/A';

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        {current && (
          <Typography variant="h6" align="center">
            {windDirection()}
          </Typography>
        )}
        <Typography variant="subtitle2" align="center">
          {formatDigits(wind_speed)} {speedUnit()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <i
            className={iconClass()}
            style={{ fontSize: current ? '3rem' : '1.75rem' }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        {wind_gust && (
          <Typography variant="subtitle2" align="center">
            Gust {formatDigits(wind_gust)}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default WindIcon;

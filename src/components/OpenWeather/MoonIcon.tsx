// import { useContext } from 'react';
// import { WeatherContext } from '../../reducer/reducer';

import { Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { arr_moon_phases, arr_moon_phases_label } from '../../utils/moon';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: '1.75rem',
    color: purple[500],
    // marginTop: '0.5rem',
    // marginBottom: '0.5rem',
  },
  moonLabel: {
    textTransform: 'capitalize',
    marginLeft: '1rem',
  },
}));

const step = 1.0 / 28;
const hstep = step / 2;

interface MoonIconProps {
  moon_phase: number;
}

const MoonIcon: React.FC<MoonIconProps> = ({ moon_phase }) => {
  const classes = useStyles();

  // const { state } = useContext(WeatherContext);
  // const { daily } = state.weatherOnecall;
  // const { moon_phase } = daily[0];

  const moonLabel = () => {
    const n_phase = Math.floor((+moon_phase + hstep) / step);
    return n_phase === 1
      ? arr_moon_phases_label[0]
      : arr_moon_phases_label[n_phase];
  };

  const iconClass = () => {
    const n_phase = Math.floor((+moon_phase + hstep) / step);
    const phase = n_phase === 1 ? arr_moon_phases[0] : arr_moon_phases[n_phase];

    return `wi ${phase} ${classes.icon}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <i className={iconClass()} />
      <Typography variant="subtitle2" className={classes.moonLabel}>
        {moonLabel()}
      </Typography>
    </div>
  );
};

export default MoonIcon;

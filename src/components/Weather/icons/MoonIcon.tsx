import { memo } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { moon_phases, moon_phases_label } from '../../../constants/moon';

import { purple } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    fontSize: '1.75rem',
    color: purple[500],
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

const MoonIcon = ({ moon_phase }: MoonIconProps) => {
  const classes = useStyles();

  const moonIconLabel = () => {
    const n_phase = Math.floor((+moon_phase + hstep) / step);
    return n_phase === 1 ? moon_phases_label[0] : moon_phases_label[n_phase];
  };

  const moonIconClass = () => {
    const n_phase = Math.floor((+moon_phase + hstep) / step);
    const phase = n_phase === 1 ? moon_phases[0] : moon_phases[n_phase];
    return `wi ${phase} ${classes.icon}`;
  };

  return (
    <div className={classes.root}>
      <i className={moonIconClass()} />
      <Typography variant="subtitle2" className={classes.moonLabel}>
        {moonIconLabel()}
      </Typography>
    </div>
  );
};

export default memo(MoonIcon);

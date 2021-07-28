import { useContext } from 'react';

import { WeatherContext } from '../../reducer/reducer';

import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  icon: { fontSize: '4rem', color: purple[500], padding: '1rem' },
}));

const WeaterIcon: React.FC = () => {
  const classes = useStyles();

  const { state } = useContext(WeatherContext);

  const { sunset, sunrise, weather } = state.weatherOnecall.current;

  const iconClass = () => {
    const dt = Math.floor(new Date().getTime() / 1000);
    const period = sunrise <= dt <= sunset ? 'night' : 'day';

    return `wi wi-owm-${period}-${weather[0].id} ${classes.icon}`;
  };

  return <i className={iconClass()}></i>;
};

export default WeaterIcon;

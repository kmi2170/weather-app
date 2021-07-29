// import { useContext } from 'react';
// import { WeatherContext } from '../../reducer/reducer';

import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: purple[500],
    margin: '0.5rem 0',
  },
}));

interface WeaterIconProps {
  sunset?: number;
  sunrise?: number;
  weather: any[];
  current: boolean;
}

const WeaterIcon: React.FC<WeaterIconProps> = ({
  sunset,
  sunrise,
  weather,
  current,
}) => {
  const classes = useStyles();

  // const { state } = useContext(WeatherContext);
  // const { sunset, sunrise, weather } = state.weatherOnecall.current;

  const iconClass = () => {
    if (current) {
      const dt = Math.floor(new Date().getTime() / 1000);
      const period = sunrise <= dt && dt <= sunset ? 'day' : 'night';

      return `wi wi-owm-${period}-${weather[0].id} ${classes.icon}`;
    }

    return `wi wi-owm-day-${weather[0].id} ${classes.icon}`;
  };

  return (
    <i
      className={iconClass()}
      style={{ fontSize: current ? '4rem' : '2rem' }}
    />
  );
};

export default WeaterIcon;

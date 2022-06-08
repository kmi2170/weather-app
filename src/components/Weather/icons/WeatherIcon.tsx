import { memo } from 'react';
import purple from '@material-ui/core/colors/purple';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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

const WeaterIcon = ({ sunset, sunrise, weather, current }: WeaterIconProps) => {
  const classes = useStyles();

  const weatherIconClass = () => {
    if (current) {
      const dt = Math.floor(new Date().getTime() / 1000);
      const period = sunrise <= dt && dt <= sunset ? 'day' : 'night';

      return `wi wi-owm-${period}-${weather[0].id} ${classes.icon}`;
    }

    return `wi wi-owm-day-${weather[0].id} ${classes.icon}`;
  };

  return (
    <i
      className={weatherIconClass()}
      style={{ fontSize: current ? '4rem' : '2rem' }}
    />
  );
};

export default memo(WeaterIcon);

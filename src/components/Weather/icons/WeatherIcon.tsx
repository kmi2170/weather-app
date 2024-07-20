import { memo } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { WeatherSummary } from "../../../api/types";
import { purple } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
  icon: {
    color: purple[500],
    margin: "0.5rem 0",
  },
}));

interface WeaterIconProps {
  sunset?: number;
  sunrise?: number;
  weather: WeatherSummary[];
  current: boolean;
}

const WeatherIcon = ({
  sunset,
  sunrise,
  weather,
  current,
}: WeaterIconProps) => {
  const classes = useStyles();

  const weatherIconClass = () => {
    if (current) {
      const dt = Math.floor(new Date().getTime() / 1000);
      const period =
        sunrise && sunset
          ? sunrise <= dt && dt <= sunset
            ? "day"
            : "night"
          : "day";

      return `wi wi-owm-${period}-${weather[0].id} ${classes.icon}`;
    }

    return `wi wi-owm-day-${weather[0].id} ${classes.icon}`;
  };

  return (
    <i
      className={weatherIconClass()}
      style={{ fontSize: current ? "4rem" : "2rem" }}
    />
  );
};

export default memo(WeatherIcon);

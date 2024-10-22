import { memo } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { purple } from "@mui/material/colors";

const useStyles = makeStyles(() => ({
  icon: {
    color: purple[500],
    margin: "0.5rem 0",
  },
}));

interface WeatherIconProps {
  sunset?: number;
  sunrise?: number;
  time?: number;
  weatherId: number;
  current: boolean;
  size: string;
}

const WeatherIcon = ({
  sunset,
  sunrise,
  time,
  weatherId,
  current,
  size = "2rem",
}: WeatherIconProps) => {
  const classes = useStyles();

  const weatherIconClass = () => {
    if (current) {
      const t = time || Math.floor(new Date().getTime() / 1000);
      const period =
        sunrise && sunset
          ? sunrise <= t && t <= sunset
            ? "day"
            : "night"
          : "day";

      return `wi wi-owm-${period}-${weatherId} ${classes.icon}`;
    }

    return `wi wi-owm-day-${weatherId} ${classes.icon}`;
  };

  return <i className={weatherIconClass()} style={{ fontSize: size }} />;
};

export default memo(WeatherIcon);

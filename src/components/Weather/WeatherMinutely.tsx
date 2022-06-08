import { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localTime } from "../../utils/time";

const useStyles = makeStyles(() => ({
  text: {},
  paper: {
    padding: "1rem",
  },
}));

const WeatherMinutely = () => {
  const classes = useStyles();

  const [minutelyData, setMinutelyData] = useState({});
  const [isFall, setIsFall] = useState<boolean>(false)

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: { timezone, minutely } } = useGetWeatherQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  const data_time: string[] = minutely?.map(({ dt }) =>
    localTime(dt, timezone)
  );

  const data_precipitation: number[] = minutely?.map(({ precipitation }) => {
    if (precipitation > 0) setIsFall(true);
    return units === "imperial" ? precipitation / 25.4 : precipitation
  });

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: isFall
          ? units === "imperial"
            ? "Precipitation for 1 Hour [in]"
            : "Precipitation for 1 Hour [mm]"
          : "No Precipitation for 1 Hour",
      },
      // legend: {
      //   display: false,
      // },
    },
  };

  useEffect(() => {
    setMinutelyData({
      labels: data_time,
      datasets: [
        {
          label: 'Precipitation',
          backgroundColor: blue[500],
          borderColor: blue[900],
          data: data_precipitation,
        },
      ],
    });
  }, [minutely]);

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Minutely
      </Typography>
      <Paper className={classes.paper} style={{ height: 150 }}>
        <Bar options={options} data={minutelyData as any} />
      </Paper>
    </>
  );
};

export default WeatherMinutely;

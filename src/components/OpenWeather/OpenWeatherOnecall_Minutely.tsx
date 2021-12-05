import { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

import { Typography, Paper } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weatherSlice";
import { useGetWeatherOnecallQuery } from "../../services/weatherOnecallApi";

import { timeLocalwithTZ } from "../../utils/units";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: "1rem",
  },
}));

const OpenWeatherOnecall_Minutely: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState({});

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  const { timezone, minutely } = weatherOnecall;

  const data_time: string[] = minutely?.map(({ dt }) =>
    timeLocalwithTZ(dt, timezone)
  );

  const fall = (fall: number) => (units === "imperial" ? fall / 25.4 : fall);

  let isFall = false;
  const data_precipitation: number[] = minutely?.map(({ precipitation }) => {
    if (precipitation > 0) isFall = true;
    return fall(+precipitation);
  });

  // const data_precipitation = minutely.map((_) => fall(Math.random()));

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
    setData({
      labels: data_time,
      datasets: [
        {
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
        <Bar options={options} data={data as any} />
      </Paper>
    </>
  );
};

export default OpenWeatherOnecall_Minutely;

import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { blue, grey, purple } from "@material-ui/core/colors";

import { useAppSelector } from "../../../app/hooks";
import { selectWeather } from "../../../features/weatherSlice";
import { useGetWeatherOnecallQuery } from "../../../services/weatherOnecallApi";

import { timeLocalwithTZforChart } from "../../../utils/units";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const ChartPrecipitation: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState({});

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  const { timezone, hourly } = weatherOnecall;

  const data_time = hourly.map(({ dt }) =>
    timeLocalwithTZforChart(dt, timezone)
  );

  const fall = (fall: number) => (units === "imperial" ? +fall / 25.4 : fall);

  const data_rain = hourly.map((el) => (el.rain ? fall(el.rain["1h"]) : 0.0));
  const data_snow = hourly.map((el) => (el.snow ? fall(el.snow["1h"]) : 0.0));

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
      },
      line: {
        borderWidth: 3,
      },
    },
    // scales: {
    //   x: {},
    //   y: {},
    // },
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    // },
  };

  useEffect(() => {
    setData({
      labels: data_time,
      datasets: [
        {
          label: units === "imperial" ? "Rain [in]" : "Rain [mm]",
          borderColor: blue[500],
          backgroundColor: blue[500],
          data: data_rain,
          yAxisID: "y",
        },
        {
          label: units === "imperial" ? "Snow [in]" : "Snow [mm]",
          borderColor: grey[500],
          backgroundColor: grey[500],
          data: data_snow,
          yAxisID: "y",
        },
      ],
    });
  }, [hourly]);

  return <Line options={options} data={data as any} />;
};

export default ChartPrecipitation;

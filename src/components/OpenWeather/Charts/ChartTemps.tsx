import { useState, useEffect, useContext } from "react";

import { Line } from "react-chartjs-2";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { pink, deepOrange, purple } from "@material-ui/core/colors";

import { useAppSelector } from "../../../app/hooks";
import { selectWeather } from "../../../features/weatherSlice";
import { useGetWeatherOnecallQuery } from "../../../services/weatherOnecallApi";

import { timeLocalwithTZforChart } from "../../../utils/units";

const useStyles = makeStyles((heme: Theme) => ({
  text: {},
}));

const ChartTemps: React.FC = () => {
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

  const data_temp = hourly.map(({ temp }) => temp);
  const data_dew_point = hourly.map(({ dew_point }) => dew_point);

  const maxT = Math.round(Math.max(...data_temp) / 5) * 5 + 5;
  const minT = Math.round(Math.min(...data_dew_point) / 5) * 5 - 5;

  const options = {
    // layout: { padding: 0 },
    responsive: true,
    maintainAspectRatio: false,
    stacked: false,
    elements: {
      point: {
        radius: 0,
        pointHitRadius: 10,
      },
      line: {
        borderWidth: 2,
      },
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            maxTicksLimit: 10,
            // callback: function (val, index) {
            //   // Hide the label of every N dataset
            //   return index % 1 === 0 ? this.getLabelForValue(val) : '';
            // },
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            display: true,
            color: purple[200],
          },
          // max: maxT,
          // min: minT,
        },
      },
    },
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Hourly Forecast for 48 Hours',
      //   fontSize: 20,
      // },
      legend: {
        display: true,
      },
    },
  };

  useEffect(() => {
    setData({
      labels: data_time,
      datasets: [
        {
          label: units === "imperial" ? "Temp [℉]" : "Temp [℃]",
          borderColor: pink[500],
          backgroundColor: pink[500],
          data: data_temp,
          yAxisID: "y",
        },
        {
          label: units === "imperial" ? "Dew Point [℉]" : "Dew Point [℃]",
          borderColor: deepOrange[900],
          backgroundColor: deepOrange[900],
          data: data_dew_point,
          yAxisID: "y",
        },
      ],
    });
  }, [hourly]);

  return <Line options={options} data={data} style={{ height: 175 }} />;
};

export default ChartTemps;

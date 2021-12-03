import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { brown, purple } from "@material-ui/core/colors";

import { useAppSelector } from "../../../app/hooks";
import { selectWeather } from "../../../features/weatherSlice";
import { useGetWeatherOnecallQuery } from "../../../services/weatherOnecallApi";

import { timeLocalwithTZforChart } from "../../../utils/units";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const ChartPressure: React.FC = () => {
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

  const pressureConvert = (p: number) =>
    units === "imperial" ? (+p / 1013.25) * 29.921 : p;

  const pressurehUnit = () => (units === "imperial" ? "inHg" : "hPa");

  const data_pressure = hourly.map(({ pressure }) => pressureConvert(pressure));

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
            display: false,
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
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  };

  useEffect(() => {
    setData({
      labels: data_time,
      datasets: [
        {
          label: units === "imperial" ? "Pressure [inHg]" : "Pressure [hPa]",
          borderColor: brown[500],
          backgroundColor: brown[500],
          data: data_pressure,
          yAxisID: "y",
        },
      ],
    });
  }, [hourly]);

  return <Line options={options} data={data} style={{ height: 100 }} />;
};

export default ChartPressure;

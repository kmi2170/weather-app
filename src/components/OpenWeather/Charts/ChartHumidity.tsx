import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { lightBlue, lime, blueGrey, purple } from "@material-ui/core/colors";

import { useAppSelector } from "../../../app/hooks";
import { selectWeather } from "../../../features/weatherSlice";
import { useGetWeatherOnecallQuery } from "../../../services/weatherOnecallApi";

import { timeLocalwithTZforChart } from "../../../utils/units";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const ChartHumidity: React.FC = () => {
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

  const data_humidity = hourly.map(({ humidity }) => humidity);
  const data_clouds = hourly.map(({ clouds }) => clouds);
  const data_pop = hourly.map(({ pop }) => pop);

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
        max: 100,
        min: 0,
      },
    },
    plugins: {
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
          label: "Humidity [%]",
          borderColor: lime[500],
          backgroundColor: lime[500],
          data: data_humidity,
          yAxisID: "y",
        },
        {
          label: "Chance of Precipitation [%]",
          borderColor: lightBlue[500],
          backgroundColor: lightBlue[500],
          data: data_pop,
          yAxisID: "y",
        },
        {
          label: "Cloud Cover [%]",
          borderColor: blueGrey[500],
          backgroundColor: blueGrey[500],
          data: data_clouds,
          yAxisID: "y",
        },
      ],
    });
  }, [hourly]);

  return <Line options={options} data={data} style={{ height: 100 }} />;
};

export default ChartHumidity;

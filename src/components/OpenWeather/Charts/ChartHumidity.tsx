import { useState, useEffect, useContext } from 'react';

import { Line } from 'react-chartjs-2';
import moment from 'moment-timezone';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { lightBlue, lime, blueGrey, purple } from '@material-ui/core/colors';

import { WeatherContext } from '../../../context';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const timeLocalwithTZ = (dt: number, tzone: string) =>
  moment(new Date(+dt * 1000).toUTCString())
    .tz(tzone)
    .format('MM/DD h a');

const ChartHumidity: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState({});

  const { state } = useContext(WeatherContext);
  const { timezone, hourly } = state.weatherOnecall;

  const data_time = hourly.map(({ dt }) => timeLocalwithTZ(dt, timezone));

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
        type: 'linear',
        display: true,
        position: 'left',
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
          label: 'Humidity [%]',
          borderColor: lime[500],
          backgroundColor: lime[500],
          data: data_humidity,
          yAxisID: 'y',
        },
        {
          label: 'Chance of Precipitation [%]',
          borderColor: lightBlue[500],
          backgroundColor: lightBlue[500],
          data: data_pop,
          yAxisID: 'y',
        },
        {
          label: 'Cloud Cover [%]',
          borderColor: blueGrey[500],
          backgroundColor: blueGrey[500],
          data: data_clouds,
          yAxisID: 'y',
        },
      ],
    });
  }, [hourly]);

  return <Line options={options} data={data} style={{ height: 100 }} />;
};

export default ChartHumidity;

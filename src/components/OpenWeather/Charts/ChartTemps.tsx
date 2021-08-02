import { useState, useEffect, useContext } from 'react';

import { Line } from 'react-chartjs-2';
import moment from 'moment-timezone';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { pink, deepOrange } from '@material-ui/core/colors';

import { WeatherContext } from '../../../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const timeLocalwithTZ = (dt: number, tzone: string) =>
  moment(new Date(+dt * 1000).toUTCString())
    .tz(tzone)
    .format('MM/DD h a');

const ChartTemps: React.FC = () => {
  const classes = useStyles();

  const { state } = useContext(WeatherContext);

  const { timezone, hourly } = state.weatherOnecall;

  const data_time = hourly.map(({ dt }) => timeLocalwithTZ(dt, timezone));

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
        },
        // max: maxT,
        // min: minT,
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

  const data = {
    labels: data_time,
    datasets: [
      {
        label: state.units === 'imperial' ? 'Temp [℉]' : 'Temp [℃]',
        borderColor: pink[500],
        backgroundColor: pink[500],
        data: data_temp,
        yAxisID: 'y',
      },
      {
        label: state.units === 'imperial' ? 'Dew Point [℉]' : 'Dew Point [℃]',
        borderColor: deepOrange[900],
        backgroundColor: deepOrange[900],
        data: data_dew_point,
        yAxisID: 'y',
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} style={{ height: 125 }} />
    </>
  );
};

export default ChartTemps;

import { useState, useEffect, useContext } from 'react';

import { Line } from 'react-chartjs-2';
import moment from 'moment-timezone';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

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

  const fall = (fall: number) =>
    state.units === 'imperial' ? +fall / 25.4 : fall;

  const data_rain = hourly.map((el) => (el.rain ? fall(el.rain['1h']) : 0.0));
  const data_snow = hourly.map((el) => (el.snow ? fall(el.snow['1h']) : 0.0));

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
        min: 0,
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
        label: state.units === 'imperial' ? 'Rain [in]' : 'Rain [mm]',
        borderColor: blue[500],
        backgroundColor: blue[500],
        data: data_rain,
        yAxisID: 'y',
      },
      {
        label: state.units === 'imperial' ? 'Snow [in]' : 'Snow [mm]',
        borderColor: grey[500],
        backgroundColor: grey[500],
        data: data_snow,
        yAxisID: 'y',
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} style={{ height: 100 }} />
    </>
  );
};

export default ChartTemps;

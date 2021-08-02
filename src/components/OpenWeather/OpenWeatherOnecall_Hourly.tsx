import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { Line } from 'react-chartjs-2';
import moment from 'moment-timezone';

import { Typography, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { blue, lime, pink, indigo, brown } from '@material-ui/core/colors';

import { WeatherContext, actionTypes } from '../../reducer/reducer';
import ChartTemps from './Charts/ChartTemps';
import ChartHumidity from './Charts/ChartHumidity';
import ChartPrecipitation from './Charts/ChartPrecipitation';
import ChartWind from './Charts/ChartWind';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: '1rem',
  },
}));

const timeLocalwithTZ = (dt: number, tzone: string) =>
  moment(new Date(+dt * 1000).toUTCString())
    .tz(tzone)
    .format('MM/DD h a');

const speedUnit = () => (state.units === 'imperial' ? 'mi/h' : 'm/s');

const OpenWeatherOnecall_Hourly: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});

  const { timezone, hourly } = state.weatherOnecall;

  const data_time = hourly.map(({ dt }) => timeLocalwithTZ(dt, timezone));

  const data_temp = hourly.map(({ temp }) => temp);
  const maxT = Math.round(Math.max(...data_temp) / 5) * 5 + 5;
  const minT = Math.round(Math.min(...data_temp) / 5) * 5 - 5;

  const data_wind_speed = hourly.map(({ wind_speed }) => wind_speed);

  const data_humidity = hourly.map(({ humidity }) => humidity);

  const fall = (fall: number) =>
    state.units === 'imperial' ? +fall / 25.4 : fall;

  const data_precipitation = hourly.map((_) => fall(Math.random()));
  // const data_precipitation = hourly.map((el) => (el.rain ? fall(el.rain['1h']) : 0));

  const data_pressure = hourly.map(({ pressure }) => pressure);

  const options1 = {
    layout: { padding: { left: 50, right: 50 } },
    responsive: true,
    maintainAspectRatio: false,
    stacked: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          display: true,
          maxTicksLimit: 10,
          callback: function (val, index) {
            // Hide the label of every N dataset
            return index % 1 === 0 ? this.getLabelForValue(val) : '';
          },
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          display: false,
        },
        max: maxT,
        min: Math.floor(minT),
        ticks: {
          color: pink[600],
          backgroundColor: pink[500],
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          color: indigo[600],
          backgroundColor: indigo[500],
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Hourly Forecast for 48 Hours',
        fontSize: 20,
      },
      legend: {
        display: true,
      },
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    stacked: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          display: false,
        },
        ticks: {
          color: lime[600],
          backgroundColor: lime[500],
        },
        max: 100,
        min: 0,
      },
      // y1: {
      //   type: 'linear',
      //   display: true,
      //   position: 'right',
      //   grid: {
      //     display: false,
      //   },
      //   ticks: {
      //     color: blue[600],
      //     backgroundColor: blue[500],
      //   },
      // },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          color: brown[600],
          backgroundColor: brown[500],
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
      },
    },
  };

  useEffect(() => {
    setData1({
      labels: data_time,
      datasets: [
        {
          label: state.units === 'imperial' ? 'Temp [℉]' : 'Temp [℃]',
          backgroundColor: pink[500],
          borderColor: pink[900],
          data: data_temp,
          yAxisID: 'y',
        },
        {
          label: 'Wind Speed',
          backgroundColor: indigo[500],
          borderColor: indigo[900],
          data: data_wind_speed,
          yAxisID: 'y1',
        },
      ],
    });

    setData2({
      labels: data_time,
      datasets: [
        {
          type: 'line',
          label: 'Humidity [%]',
          backgroundColor: lime[500],
          borderColor: lime[900],
          data: data_humidity,
          yAxisID: 'y',
        },
        // {
        //   type: 'bar',
        //   label:
        //     state.units === 'imperial'
        //       ? 'Precipitation [in]'
        //       : 'Precipitation [mm]',
        //   backgroundColor: indigo[500],
        //   borderColor: indigo[900],
        //   data: data_precipitation,
        //   yAxisID: 'y1',
        // },
        {
          type: 'line',
          label:
            state.units === 'imperial'
              ? 'Pressure [inHg]'
              : 'Precipitation [hPa]',
          backgroundColor: brown[500],
          borderColor: brown[900],
          data: data_pressure,
          yAxisID: 'y1',
        },
      ],
    });
  }, [state.units]);

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Hourly
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" align="center" className={classes.text}>
          Hourly Fourcast for 48 Hours
        </Typography>
        <div>
          <ChartTemps />
        </div>
        <div>
          <ChartHumidity />
        </div>
        <div>
          <ChartPrecipitation />
        </div>
        <div>
          <ChartWind />
        </div>
      </Paper>
    </>
  );
};

export default OpenWeatherOnecall_Hourly;

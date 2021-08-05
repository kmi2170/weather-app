import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import { Bar } from 'react-chartjs-2';
import moment from 'moment-timezone';

import { Typography, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { WeatherContext, actionTypes } from '../../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: '1rem',
  },
}));

const timeLocalwithTZ = (dt: number, tzone: string) =>
  moment(new Date(+dt * 1000).toUTCString())
    .tz(tzone)
    .format('h:mm a');

const OpenWeatherOnecall_Minutely: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const [data, setData] = useState({});

  const { timezone, minutely } = state.weatherOnecall;

  const data_time = minutely?.map(({ dt }) => timeLocalwithTZ(dt, timezone));

  const fall = (fall: number) =>
    state.units === 'imperial' ? fall / 25.4 : fall;

  let isFall = false;
  const data_precipitation = minutely?.map(({ precipitation }) => {
    if (precipitation > 0) isFall = true;
    return fall(+precipitation);
  });

  // const data_precipitation = minutely.map((_) => fall(Math.random()));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: isFall
          ? state.units === 'imperial'
            ? 'Precipitation for 1 Hour [in]'
            : 'Precipitation for 1 Hour [mm]'
          : 'No Precipitation for 1 Hour',
        fontSiz: 20,
      },
      legend: {
        display: false,
      },
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
  }, [state.units]);

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Minutely
      </Typography>
      <Paper className={classes.paper}>
        <Bar options={options} data={data} style={{ height: 100 }} />
      </Paper>
    </>
  );
};

export default OpenWeatherOnecall_Minutely;

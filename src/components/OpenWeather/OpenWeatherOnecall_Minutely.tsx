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

  const data_time = minutely.map(({ dt }) => timeLocalwithTZ(dt, timezone));

  const fall = (fall: number) =>
    state.units === 'imperial' ? +fall / 25.4 : fall;

  const data_precipitation = minutely.map(({ precipiation }) =>
    fall(precipiation)
  );

  // const data_precipitation = minutely.map((_) => fall(Math.random()));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
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
        text:
          state.units === 'imperial'
            ? 'Precipitation forecast for 1 hour [in]'
            : 'Precipitation forecast for 1 hour [mm]',
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

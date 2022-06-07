import { useState, useEffect } from 'react';
import { green, lightGreen } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { useAppSelector } from '../../../app/hooks';
import { selectWeather } from '../../../features/weatherSlice';
import { useGetWeatherOnecallQuery } from '../../../services/weatherOnecallApi';
import { localDateTime } from '../../../utils/time';

const ChartWind = () => {
  const [data, setData] = useState({});

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });
  const { timezone, hourly } = weatherOnecall;

  const data_time = hourly.map(({ dt }) => localDateTime(dt, timezone));

  const fall = (fall: number) => (units === 'imperial' ? +fall / 25.4 : fall);

  const pressureConvert = (p: number) =>
    units === 'imperial' ? +p / 1013.25 * 29.921 : p;

  const data_wind_speed = hourly.map(({ wind_speed }) => wind_speed);
  const data_wind_gust = hourly.map(({ wind_gust }) => wind_gust);

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
    //   y: {
    //     min: 0,
    //   },
    // },
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    // },
  };

  useEffect(
    () => {
      setData({
        labels: data_time,
        datasets: [
          {
            label:
              units === 'imperial' ? 'Wind Speed [mi]' : 'Wind Speed [m/s]',
            borderColor: green[500],
            backgroundColor: green[500],
            data: data_wind_speed,
            yAxisID: 'y',
          },
          {
            label: units === 'imperial' ? 'Gust [mi]' : 'Gust [m/s]',
            borderColor: lightGreen[500],
            backgroundColor: lightGreen[500],
            data: data_wind_gust,
            yAxisID: 'y',
          },
        ],
      });
    },
    [hourly]
  );

  return <Line options={options} data={data as any} />;
};

export default ChartWind;

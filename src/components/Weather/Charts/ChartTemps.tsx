import { useState, useEffect } from 'react';
import { pink, deepOrange } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { useAppSelector } from '../../../app/hooks';
import { selectWeather } from '../../../features/weatherSlice';
import { useGetWeatherQuery } from '../../../services/weatherApi';
import { localDateTime } from '../../../utils/time';

const ChartTemps = () => {
  const [data, setData] = useState({});

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: weatherOnecall } = useGetWeatherQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  const { timezone, hourly } = weatherOnecall;

  const data_time = hourly.map(({ dt }) => localDateTime(dt, timezone));

  const data_temp = hourly.map(({ temp }) => temp);
  const data_dew_point = hourly.map(({ dew_point }) => dew_point);

  const maxT = Math.round(Math.max(...data_temp) / 5) * 5 + 5;
  const minT = Math.round(Math.min(...data_dew_point) / 5) * 5 - 5;

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
    //   y: {},
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
            label: units === 'imperial' ? 'Temp [℉]' : 'Temp [℃]',
            borderColor: pink[500],
            backgroundColor: pink[500],
            data: data_temp,
            yAxisID: 'y',
          },
          {
            label: units === 'imperial' ? 'Dew Point [℉]' : 'Dew Point [℃]',
            borderColor: deepOrange[900],
            backgroundColor: deepOrange[900],
            data: data_dew_point,
            yAxisID: 'y',
          },
        ],
      });
    },
    [hourly]
  );

  return <Line options={options} data={data as any} />;
};

export default ChartTemps;

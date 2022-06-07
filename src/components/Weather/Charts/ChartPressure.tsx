import { useState, useEffect } from 'react';
import { brown } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { useAppSelector } from '../../../app/hooks';
import { selectWeather } from '../../../features/weatherSlice';
import { useGetWeatherQuery } from '../../../services/weatherApi';
import { localDateTime } from '../../../utils/time';

const ChartPressure = () => {
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

  const pressureConvert = (p: number) =>
    units === 'imperial' ? +p / 1013.25 * 29.921 : p;

  const pressurehUnit = () => (units === 'imperial' ? 'inHg' : 'hPa');

  const data_pressure = hourly.map(({ pressure }) => pressureConvert(pressure));

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
            label: units === 'imperial' ? 'Pressure [inHg]' : 'Pressure [hPa]',
            borderColor: brown[500],
            backgroundColor: brown[500],
            data: data_pressure,
            yAxisID: 'y',
          },
        ],
      });
    },
    [hourly]
  );

  return <Line options={options} data={data as any} />;
};

export default ChartPressure;

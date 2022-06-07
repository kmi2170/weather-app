import { useState, useEffect } from 'react';
import { blue, grey } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { useAppSelector } from '../../../app/hooks';
import { selectWeather } from '../../../features/weatherSlice';
import { useGetWeatherQuery } from '../../../services/weatherApi';
import { localDateTime } from '../../../utils/time';

const ChartPrecipitation = () => {
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

  const fall = (fall: number) => (units === 'imperial' ? +fall / 25.4 : fall);

  const data_rain = hourly.map(el => (el.rain ? fall(el.rain['1h']) : 0.0));
  const data_snow = hourly.map(el => (el.snow ? fall(el.snow['1h']) : 0.0));

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
            label: units === 'imperial' ? 'Rain [in]' : 'Rain [mm]',
            borderColor: blue[500],
            backgroundColor: blue[500],
            data: data_rain,
            yAxisID: 'y',
          },
          {
            label: units === 'imperial' ? 'Snow [in]' : 'Snow [mm]',
            borderColor: grey[500],
            backgroundColor: grey[500],
            data: data_snow,
            yAxisID: 'y',
          },
        ],
      });
    },
    [hourly]
  );

  return <Line options={options} data={data as any} />;
};

export default ChartPrecipitation;

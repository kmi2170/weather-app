import { useState, useEffect, memo } from 'react';
import { green, lightGreen } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { ChartProps } from '../../../api/types';

const ChartWind = ({ hourly, dataTime, units }: ChartProps) => {
  const [data, setData] = useState({});

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
  };

  useEffect(
    () => {
      setData({
        labels: dataTime,
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

export default memo(ChartWind);

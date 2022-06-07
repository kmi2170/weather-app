import { useState, useEffect } from 'react';
import { lightBlue, lime, blueGrey } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { ChartProps } from '../../../api/types';

const ChartHumidity = ({ hourly, dataTime }: ChartProps) => {
  const [data, setData] = useState({});

  const data_humidity = hourly.map(({ humidity }) => humidity);
  const data_clouds = hourly.map(({ clouds }) => clouds);
  const data_pop = hourly.map(({ pop }) => pop);

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
    scales: {
      y: {
        max: 100,
        min: 0,
      },
    },
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    // },
  };

  useEffect(
    () => {
      setData({
        labels: dataTime,
        datasets: [
          {
            label: 'Humidity [%]',
            borderColor: lime[500],
            backgroundColor: lime[500],
            data: data_humidity,
            yAxisID: 'y',
          },
          {
            label: 'Chance of Precipitation [%]',
            borderColor: lightBlue[500],
            backgroundColor: lightBlue[500],
            data: data_pop,
            yAxisID: 'y',
          },
          {
            label: 'Cloud Cover [%]',
            borderColor: blueGrey[500],
            backgroundColor: blueGrey[500],
            data: data_clouds,
            yAxisID: 'y',
          },
        ],
      });
    },
    [hourly]
  );

  return <Line options={options} data={data as any} />;
};

export default ChartHumidity;

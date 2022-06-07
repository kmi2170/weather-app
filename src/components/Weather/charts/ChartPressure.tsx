import { useState, useEffect } from 'react';
import { brown } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { ChartProps } from '../../../api/types';

const ChartPressure = ({ hourly, dataTime, units }: ChartProps) => {
  const [data, setData] = useState({});

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
        labels: dataTime,
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

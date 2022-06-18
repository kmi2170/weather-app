import { useState, useEffect, memo } from 'react';
import { brown } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { ChartProps } from '../../../api/types';

const ChartPressure = ({ chartData, dataTime, units }: ChartProps) => {
  const [data, setData] = useState({});

  const data_pressure = chartData.map(({ pressure }) =>
    units === 'imperial' ? (pressure / 1013.25) * 29.921 : pressure
  );

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

  useEffect(() => {
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
  }, [chartData]);

  return <Line options={options} data={data as any} />;
};

export default memo(ChartPressure);

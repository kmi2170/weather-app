import { useState, useEffect, memo } from 'react';
import { brown } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

import { ChartProps } from '../../../api/types';

const ChartPressure = ({ chartData, dataTime, units }: ChartProps) => {
  const [data, setData] = useState<ChartData | null>(null);

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

  /* eslint-disable react-hooks/exhaustive-deps */
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
  /* eslint-enable react-hooks/exhaustive-deps */

  return <Line options={options} data={data} />;
};

export default memo(ChartPressure);

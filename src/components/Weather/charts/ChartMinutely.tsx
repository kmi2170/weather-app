import { useState, useEffect, useMemo, memo } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { blue } from '@material-ui/core/colors';
import { ChartProps } from '../../../api/types';

const ChartMinutely = ({ chartData, dataTime, units }: ChartProps) => {
  const [data, setData] = useState({});

  let isFall = false;
  const data_precipitation: number[] = chartData?.map(({ precipitation }) => {
    if (precipitation > 0) isFall = true;
    return units === 'imperial' ? precipitation / 25.4 : precipitation;
  });

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: isFall
          ? units === 'imperial'
            ? 'Precipitation for 1 Hour [in]'
            : 'Precipitation for 1 Hour [mm]'
          : 'No Precipitation for 1 Hour',
      },
    },
  };

  useEffect(() => {
    setData({
      labels: dataTime,
      datasets: [
        {
          label: 'Precipitation',
          backgroundColor: blue[500],
          borderColor: blue[900],
          data: data_precipitation,
        },
      ],
    });
  }, [chartData]);

  return <Bar options={options} data={data as any} />;
};

export default memo(ChartMinutely);

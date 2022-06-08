import { useState, useEffect, memo } from 'react';
import { pink, deepOrange } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { ChartProps } from '../../../api/types';

const ChartTemps = ({ hourly, dataTime, units }: ChartProps) => {
  const [data, setData] = useState({});

  const data_temp = hourly.map(({ temp }) => temp);
  const data_dew_point = hourly.map(({ dew_point }) => dew_point);

  // const maxT = Math.round(Math.max(...data_temp) / 5) * 5 + 5;
  // const minT = Math.round(Math.min(...data_dew_point) / 5) * 5 - 5;

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

export default memo(ChartTemps);

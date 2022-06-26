import { useState, useEffect, memo } from 'react';
import { lightBlue, lime, blueGrey } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

import { ChartProps } from '../../../api/types';

const ChartHumidity = ({ chartData, dataTime }: ChartProps) => {
  const [data, setData] = useState<ChartData | null>(null);

  const data_humidity = chartData.map(({ humidity }) => humidity);
  const data_clouds = chartData.map(({ clouds }) => clouds);
  const data_pop = chartData.map(({ pop }) => pop);

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
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
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
  }, [chartData]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return <Line options={options} data={data} />;
};

export default memo(ChartHumidity);

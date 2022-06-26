import { useState, useEffect, memo } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import { blue } from '@material-ui/core/colors';
import { ChartProps, WeatherMinutely } from '../../../api/types';

interface ChartMinutelyProps extends Omit<ChartProps, 'chartData'> {
  chartData: WeatherMinutely;
}

const ChartMinutely = ({ chartData, dataTime, units }: ChartMinutelyProps) => {
  const [data, setData] = useState<ChartData | null>(null);

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

  /* eslint-disable react-hooks/exhaustive-deps */
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
  /* eslint-enable react-hooks/exhaustive-deps */

  return <Bar options={options} data={data} />;
};

export default memo(ChartMinutely);

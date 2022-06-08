import { useState, useEffect, memo } from 'react';
import { blue, grey } from '@material-ui/core/colors';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { ChartProps } from '../../../api/types';

const ChartPrecipitation = ({ hourly, dataTime, units }: ChartProps) => {
  const [data, setData] = useState({});

  const fall = (fall: number) => (units === 'imperial' ? +fall / 25.4 : fall);

  const data_rain = hourly.map(
    (el: any) => (el.rain ? fall(el.rain['1h']) : 0.0)
  );
  const data_snow = hourly.map(
    (el: any) => (el.snow ? fall(el.snow['1h']) : 0.0)
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

  useEffect(
    () => {
      setData({
        labels: dataTime,
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

export default memo(ChartPrecipitation);

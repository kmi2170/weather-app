import { useState, useEffect, memo } from "react";
import { green, lightGreen } from "@material-ui/core/colors";
import { ChartOptions, ChartData } from "chart.js";

import { ChartProps } from "../../../api/types";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartWind = ({ chartData, dataTime, units }: ChartProps) => {
  const [data, setData] = useState<ChartData | null>(null);

  const data_wind_speed = chartData.map(({ wind_speed }) => wind_speed);
  const data_wind_gust = chartData.map(({ wind_gust }) => wind_gust);

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
          label: units === "imperial" ? "Wind Speed [mi]" : "Wind Speed [m/s]",
          borderColor: green[500],
          backgroundColor: green[500],
          data: data_wind_speed,
          yAxisID: "y",
        },
        {
          label: units === "imperial" ? "Gust [mi]" : "Gust [m/s]",
          borderColor: lightGreen[500],
          backgroundColor: lightGreen[500],
          data: data_wind_gust,
          yAxisID: "y",
        },
      ],
    });
  }, [chartData]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (data === null) return <div>ChartWind</div>;

  return <Line options={options} data={data} />;
};

export default memo(ChartWind);

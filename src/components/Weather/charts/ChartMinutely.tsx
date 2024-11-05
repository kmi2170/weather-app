import { memo } from "react";
import { blue } from "@mui/material/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { ChartProps, WeatherMinutely } from "../../../api/types/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartMinutelyProps extends Omit<ChartProps, "chartData"> {
  chartData: number[];
}

const ChartMinutely = ({
  chartData,
  dataTime,
  // maxValue,
  height,
  units,
}: ChartMinutelyProps) => {
  const formatter = (x: number) => {
    if (x === 0) return null;
    return x.toFixed(2);
  };

  const tick = units === "imperial" ? 0.2 : 5;

  const maxValue = Math.ceil(Math.max(...chartData) / tick) * tick;

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        min: 0,
        max: maxValue,
        ticks: {
          display: true,
        },
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data: ChartData<"bar"> = {
    labels: dataTime,
    datasets: [
      {
        borderColor: blue[500],
        backgroundColor: blue[500],
        data: chartData,
      },
    ],
  };

  return <Bar options={options} data={data} height={height} />;
};

export default memo(ChartMinutely);

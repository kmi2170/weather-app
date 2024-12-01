import Box from "@mui/material/Box";
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
import { ChartProps } from "../../../api/types/weather";
import { verticalLineOnHover } from "../../../utils/chart/crosshair";

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
  dataLabel: dataTime,
  height,
  units,
}: Omit<ChartMinutelyProps, "backgroundRanges">) => {
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

  return (
    <Box sx={{ height }}>
      <Bar options={options} data={data} plugins={[verticalLineOnHover]} />
    </Box>
  );
};

export default ChartMinutely;

import { memo } from "react";
import Box from "@mui/material/Box";
import { green, lightGreen } from "@mui/material/colors";
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
import { ChartOptions, ChartData } from "chart.js";
import { ChartProps } from "../../../api/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartWind = ({
  chartData,
  dataTime,
  units,
  height = "200px",
}: ChartProps) => {
  const data_wind_speed = chartData.map(({ wind_speed }) => wind_speed);
  const data_wind_gust = chartData.map(({ wind_gust }) => wind_gust ?? 0);

  const options: ChartOptions<"line"> = {
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

  const data: ChartData<"line"> = {
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
  };

  return (
    <Box sx={{ height: height }}>
      <Line options={options} data={data} />
    </Box>
  );
};

export default memo(ChartWind);

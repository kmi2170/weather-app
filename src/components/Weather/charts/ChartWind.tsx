import { memo } from "react";
import Box from "@mui/material/Box";
import { green, lime } from "@mui/material/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { ChartProps } from "../../../api/types/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
);

const ChartWind = ({
  chartData,
  dataTime,
  dataIsDay,
  units,
  height = "200px",
  chartBoxStyle,
  chartBackgroundProps,
}: ChartProps) => {
  const data_wind_speed = chartData.map(({ wind_speed }) => wind_speed);
  const data_wind_gust = chartData.map(({ wind_gust }) => wind_gust ?? 0);

  const tick = units === "imperial" ? 10 : 5;

  const maxValue =
    Math.ceil(
      Math.max(Math.max(...data_wind_speed), Math.max(...data_wind_gust)) / tick
    ) * tick;
  const minValue =
    Math.floor(
      Math.min(Math.min(...data_wind_speed), Math.min(...data_wind_gust)) / tick
    ) * tick;
  const data_isDay = dataIsDay?.map((isDay) =>
    isDay ? 0 : maxValue
  ) as number[];

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
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: { display: false },
        max: maxValue,
        min: minValue,
      },
    },
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex !== 2;
        },
      },
      legend: {
        labels: {
          filter: function (labelItem) {
            return labelItem.datasetIndex !== 2;
          },
        },
      },
    },
  };

  const data: ChartData<"line" | "bar"> = {
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
        borderColor: lime[600],
        backgroundColor: lime[600],
        data: data_wind_gust,
        yAxisID: "y",
      },
      {
        type: "bar",
        data: data_isDay,
        yAxisID: "y",
        ...chartBackgroundProps,
      },
    ],
  };

  return (
    <Box sx={{ height: height, ...chartBoxStyle }}>
      <Chart type="line" options={options} data={data} />
    </Box>
  );
};

export default memo(ChartWind);

import { memo } from "react";
import Box from "@mui/material/Box";
import { pink, deepOrange } from "@mui/material/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  BarElement,
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

const ChartTemps = ({
  chartData,
  dataTime,
  units,
  height,
  dataIsDay,
}: ChartProps) => {
  const data_temp = chartData.map(({ temp }) => temp);
  const data_dew_point = chartData.map(({ dew_point }) => dew_point);

  const bg_night_color = "rgba(0, 0, 0, 0.05)";
  const tick = units === "imperial" ? 10 : 5;

  const maxValue = Math.ceil(Math.max(...data_temp) / tick) * tick;
  const minValue = Math.floor(Math.min(...data_dew_point) / tick) * tick;
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
        label: units === "imperial" ? "Temp [℉]" : "Temp [℃]",
        borderColor: pink[400],
        backgroundColor: pink[400],
        data: data_temp,
        yAxisID: "y",
      },
      {
        label: units === "imperial" ? "Dew Point [℉]" : "Dew Point [℃]",
        borderColor: deepOrange[900],
        backgroundColor: deepOrange[900],
        data: data_dew_point,
        yAxisID: "y",
      },
      {
        type: "bar",
        backgroundColor: bg_night_color,
        data: data_isDay,
        barPercentage: 1,
        categoryPercentage: 0.999999,
        yAxisID: "y",
      },
    ],
  };

  return (
    <Box sx={{ height: height }}>
      <Chart type="line" options={options} data={data} />
    </Box>
  );
};

export default memo(ChartTemps);

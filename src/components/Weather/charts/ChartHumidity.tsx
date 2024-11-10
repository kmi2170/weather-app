import { memo } from "react";
import Box from "@mui/material/Box";
import { blueGrey, blue, purple } from "@mui/material/colors";

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
import { chartBoxStyle, createBackgroundPlugin } from "./utils";

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

const ChartHumidity = ({
  chartData,
  dataLabel,
  backgroundRanges,
  height = "200px",
}: ChartProps) => {
  const data_humidity = chartData.map(({ humidity }) => humidity);
  const data_clouds = chartData.map(({ clouds }) => clouds);
  const data_pop = chartData.map(({ pop }) => pop * 100);

  const backgroundPlugin = createBackgroundPlugin(backgroundRanges);

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
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      y: {
        border: { display: false },
        max: 100,
        min: 0,
      },
    },
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex !== 3;
        },
      },
      legend: {
        labels: {
          filter: function (labelItem) {
            return labelItem.datasetIndex !== 3;
          },
        },
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: dataLabel,
    datasets: [
      {
        type: "line",
        label: "Humidity [%]",
        borderColor: purple[400],
        backgroundColor: purple[400],
        data: data_humidity,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Chance of Precipitation [%]",
        borderColor: blue[500],
        backgroundColor: blue[500],
        data: data_pop,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Cloud Cover [%]",
        borderColor: blueGrey[400],
        backgroundColor: blueGrey[400],
        data: data_clouds,
        yAxisID: "y",
      },
    ],
  };

  return (
    <Box sx={{ height: height, ...chartBoxStyle }}>
      <Chart
        type="line"
        options={options}
        data={data}
        plugins={[backgroundPlugin]}
      />
    </Box>
  );
};

export default memo(ChartHumidity);

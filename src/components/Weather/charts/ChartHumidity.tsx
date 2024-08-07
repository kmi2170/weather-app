import { memo } from "react";
import Box from "@mui/material/Box";
import { lightBlue, lime, blueGrey } from "@mui/material/colors";

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

const ChartHumidity = ({
  chartData,
  dataTime,
  height = "200px",
}: ChartProps) => {
  const data_humidity = chartData.map(({ humidity }) => humidity);
  const data_clouds = chartData.map(({ clouds }) => clouds);
  const data_pop = chartData.map(({ pop }) => pop * 100);

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
      y: {
        max: 100,
        min: 0,
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: dataTime,
    datasets: [
      {
        label: "Humidity [%]",
        borderColor: lime[500],
        backgroundColor: lime[500],
        data: data_humidity,
        yAxisID: "y",
      },
      {
        label: "Chance of Precipitation [%]",
        borderColor: lightBlue[500],
        backgroundColor: lightBlue[500],
        data: data_pop,
        yAxisID: "y",
      },
      {
        label: "Cloud Cover [%]",
        borderColor: blueGrey[500],
        backgroundColor: blueGrey[500],
        data: data_clouds,
        yAxisID: "y",
      },
    ],
  };

  return (
    <Box sx={{ height: height }}>
      <Line options={options} data={data} />;
    </Box>
  );
};

export default memo(ChartHumidity);

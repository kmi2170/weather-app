import { memo } from "react";
import Box from "@mui/material/Box";
import { lightBlue, lime, blueGrey, blue } from "@mui/material/colors";

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
import { tooltip } from "leaflet";

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
  dataTime,
  dataIsDay,
  height = "200px",
}: ChartProps) => {
  const data_humidity = chartData.map(({ humidity }) => humidity);
  const data_clouds = chartData.map(({ clouds }) => clouds);
  const data_pop = chartData.map(({ pop }) => pop * 100);

  const bg_night_color = "rgba(0, 0, 0, 0.05)";
  const data_isDay = dataIsDay?.map((isDay) => (isDay ? 0 : 100)) as number[];

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

  const data: ChartData<"line" | "bar"> = {
    labels: dataTime,
    datasets: [
      {
        type: "line",
        label: "Humidity [%]",
        borderColor: lime[600],
        backgroundColor: lime[600],
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

export default memo(ChartHumidity);

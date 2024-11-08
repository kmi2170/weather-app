import { memo } from "react";
import Box from "@mui/material/Box";
import { brown } from "@mui/material/colors";
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
import { Chart } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { ChartProps } from "../../../api/types/weather";
import { chartBoxStyle, createBackgroundPlugin } from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartPressure = ({
  chartData,
  dataTime,
  backgroundRanges,
  units,
  height = "200px",
}: ChartProps) => {
  const data_pressure = chartData.map(({ pressure }) =>
    units === "imperial" ? (pressure / 1013.25) * 29.921 : pressure
  );

  const tick = units === "imperial" ? 0.1 : 5;

  const maxValue = Math.ceil(Math.max(...data_pressure) / tick) * tick;
  const minValue = Math.floor(Math.min(...data_pressure) / tick) * tick;

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
          return tooltipItem.datasetIndex !== 1;
        },
      },
      legend: {
        labels: {
          filter: function (labelItem) {
            return labelItem.datasetIndex !== 1;
          },
        },
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: dataTime,
    datasets: [
      {
        label: units === "imperial" ? "Pressure [inHg]" : "Pressure [hPa]",
        borderColor: brown[500],
        backgroundColor: brown[500],
        data: data_pressure,
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

export default memo(ChartPressure);

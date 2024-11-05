import { memo } from "react";
import Box from "@mui/material/Box";
import { blue, purple } from "@mui/material/colors";
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
  Filler,
} from "chart.js";
import { ChartOptions, ChartData } from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartProps } from "../../../api/types/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  Filler,
  Title,
  Tooltip,
  Legend
);

const ChartPrecipitation = ({
  chartData,
  dataTime,
  dataIsDay,
  units,
  height = "200px",
  chartBoxStyle,
  chartBackgroundProps,
}: ChartProps) => {
  const precipitation = (fall: number) =>
    units === "imperial" ? +fall / 25.4 : fall;

  const data_rain = chartData.map((el) =>
    el.rain && el.rain["1h"] ? precipitation(el.rain["1h"]) : 0
  );
  const data_snow = chartData.map((el) =>
    el.snow && el.snow["1h"] ? precipitation(el.snow["1h"]) : 0
  );

  const tick = units === "imperial" ? 0.2 : 5;

  const maxValue =
    Math.ceil(Math.max(Math.max(...data_rain), Math.max(...data_snow)) / tick) *
      tick || units === "imperial"
      ? 0.2
      : 1;

  const data_isDay = dataIsDay?.map((isDay) =>
    isDay ? 0 : maxValue
  ) as number[];

  console.log(maxValue, data_rain);

  const options: ChartOptions<"bar"> = {
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
        min: 0,
        max: maxValue,
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
        type: "line",
        label: units === "imperial" ? "Rain [in]" : "Rain [mm]",
        borderColor: blue[500],
        backgroundColor: blue[200],
        data: data_rain,
        fill: true,
        yAxisID: "y",
      },
      {
        type: "line",
        label: units === "imperial" ? "Snow [in]" : "Snow [mm]",
        borderColor: purple[500],
        backgroundColor: purple[200],
        fill: true,
        data: data_snow,
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
    <Box
      sx={{
        height: height,

        ...chartBoxStyle,
      }}
    >
      <Chart type="line" options={options} data={data} />
    </Box>
  );
};

export default memo(ChartPrecipitation);

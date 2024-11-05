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
import theme from "../../../theme/theme";

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
  chartBoxStyle,
}: ChartProps) => {
  const data_temp = chartData.map(({ temp }) => temp);
  const data_dew_point = chartData.map(({ dew_point }) => dew_point);

  const bg_night_color = "rgba(0, 0, 128, 0.1)";
  const tick = units === "imperial" ? 5 : 5;

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
        ticks: {
          padding: 0,
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
    <Box
      sx={{
        height: height,
        ...chartBoxStyle,
        // padding: "5px 10px",
        // borderRadius: "5px",
        // boxShadow: `3px 3px 3px ${theme.palette.primary.light}`,
        // border: "1px solid purple",
      }}
    >
      <Chart type="line" options={options} data={data} />
    </Box>
  );
};

export default memo(ChartTemps);

import Box from "@mui/material/Box";
import { green, lime, orange, teal } from "@mui/material/colors";
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
import { createBackgroundPlugin } from "../../../utils/chart/background";
import {
  createChartOptions,
  interpolationMode,
} from "../../../utils/chart/options";
import { chartBoxStyle } from "../../../utils/chart/style";
import { verticalLineOnHover } from "../../../utils/chart/crosshair";

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
  dataLabel,
  backgroundRanges,
  units,
  height = "200px",
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

  const backgroundPlugin = createBackgroundPlugin(backgroundRanges);
  const chartOptions = createChartOptions({ yMax: maxValue, yMin: minValue });

  const options: ChartOptions<"line"> = {
    ...chartOptions,
  };

  const data: ChartData<"line"> = {
    labels: dataLabel,
    datasets: [
      {
        label: units === "imperial" ? "Wind Speed [mi]" : "Wind Speed [m/s]",
        borderColor: green[500],
        backgroundColor: green[500],
        data: data_wind_speed,
        yAxisID: "y",
        cubicInterpolationMode: interpolationMode,
      },
      {
        label: units === "imperial" ? "Gust [mi]" : "Gust [m/s]",
        borderColor: orange[500],
        backgroundColor: orange[500],
        data: data_wind_gust,
        yAxisID: "y",
        cubicInterpolationMode: interpolationMode,
      },
    ],
  };

  return (
    <Box sx={{ height: height, ...chartBoxStyle }}>
      <Chart
        key={Date.now().toString() + "wind"}
        type="line"
        options={options}
        data={data}
        plugins={[backgroundPlugin, verticalLineOnHover]}
      />
    </Box>
  );
};

export default ChartWind;

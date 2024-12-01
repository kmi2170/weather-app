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
import { createBackgroundPlugin } from "../../../utils/chart/background";
import { createChartOptions } from "../../../utils/chart/options";
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

const ChartTemps = ({
  chartData,
  dataLabel,
  units,
  height,
  backgroundRanges,
}: ChartProps) => {
  const data_temp = chartData.map(({ temp }) => temp);
  const data_dew_point = chartData.map(({ dew_point }) => dew_point);

  const tick = units === "imperial" ? 5 : 5;
  const maxValue = Math.ceil(Math.max(...data_temp) / tick) * tick;
  const minValue = Math.floor(Math.min(...data_dew_point) / tick) * tick;

  const backgroundPlugin = createBackgroundPlugin(backgroundRanges);
  const charOptions = createChartOptions({ yMax: maxValue, yMin: minValue });

  const options: ChartOptions<"line"> = {
    ...charOptions,
  };

  const data: ChartData<"line"> = {
    labels: dataLabel,
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
    ],
  };

  return (
    <Box
      sx={{
        height: height,
        ...chartBoxStyle,
      }}
    >
      <Chart
        key={Date.now().toString() + "temp"}
        type="line"
        options={options}
        data={data}
        plugins={[backgroundPlugin, verticalLineOnHover]}
      />
    </Box>
  );
};

export default ChartTemps;

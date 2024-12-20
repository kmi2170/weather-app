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
  Filler,
  Title,
  Tooltip,
  Legend
);

const ChartPrecipitation = ({
  chartData,
  dataLabel,
  backgroundRanges,
  units,
  height = "200px",
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

  const backgroundPlugin = createBackgroundPlugin(backgroundRanges);
  const charOptions = createChartOptions({ yMax: maxValue, yMin: 0 });

  const options: ChartOptions<"line"> = {
    ...charOptions,
  };

  const data: ChartData<"line"> = {
    labels: dataLabel,
    datasets: [
      {
        type: "line",
        label: units === "imperial" ? "Rain [in]" : "Rain [mm]",
        backgroundColor: "rgba(31, 164, 255, 0.6)",
        data: data_rain,
        fill: true,
        yAxisID: "y",
      },
      {
        type: "line",
        label: units === "imperial" ? "Snow [in]" : "Snow [mm]",
        backgroundColor: "rgba(148, 0, 211, 0.5)",
        fill: true,
        data: data_snow,
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
        key={Date.now().toString() + "precipitation"}
        type="line"
        options={options}
        data={data}
        plugins={[backgroundPlugin, verticalLineOnHover]}
      />
    </Box>
  );
};

export default ChartPrecipitation;

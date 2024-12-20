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
  const chartOptions = createChartOptions({ yMax: 100, yMin: 0 });

  const options: ChartOptions<"line"> = {
    ...chartOptions,
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
        cubicInterpolationMode: "monotone",
      },
      {
        type: "line",
        label: "Precipitation [%]",
        borderColor: blue[500],
        backgroundColor: blue[500],
        data: data_pop,
        yAxisID: "y",
        cubicInterpolationMode: "monotone",
      },
      {
        type: "line",
        label: "Cloud Cover [%]",
        borderColor: blueGrey[400],
        backgroundColor: blueGrey[400],
        data: data_clouds,
        yAxisID: "y",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  return (
    <Box
      sx={{
        height: { xs: `calc(${height} + 25px)`, sm: height },
        ...chartBoxStyle,
      }}
    >
      <Chart
        key={Date.now() + "humidity"}
        type="line"
        options={options}
        data={data}
        plugins={[backgroundPlugin, verticalLineOnHover]}
      />
    </Box>
  );
};

export default ChartHumidity;

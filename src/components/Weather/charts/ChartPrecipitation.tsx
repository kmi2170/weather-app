import { memo } from "react";
import Box from "@mui/material/Box";
import { blue, grey } from "@mui/material/colors";
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
import { ChartOptions, ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
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

const ChartPrecipitation = ({
  chartData,
  dataTime,
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
        min: 0,
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: dataTime,
    datasets: [
      {
        label: units === "imperial" ? "Rain [in]" : "Rain [mm]",
        borderColor: blue[500],
        backgroundColor: blue[500],
        data: data_rain,
        yAxisID: "y",
      },
      {
        label: units === "imperial" ? "Snow [in]" : "Snow [mm]",
        borderColor: grey[500],
        backgroundColor: grey[500],
        data: data_snow,
        yAxisID: "y",
      },
    ],
  };

  return (
    <Box
      sx={{
        height: height,
      }}
    >
      <Line options={options} data={data} />
    </Box>
  );
};

export default memo(ChartPrecipitation);

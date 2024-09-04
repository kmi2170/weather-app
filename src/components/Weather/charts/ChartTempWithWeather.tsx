/**
 * Work In Progress
 */

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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { ChartProps } from "../../../api/types";
import WeatherIcon from "../icons/WeatherIcon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartTempWeather = ({
  chartData,
  dataTime,
  units,
  height,
}: ChartProps) => {
  const data_temp = chartData.map(({ temp }) => temp);
  const data_dew_point = chartData.map(({ dew_point }) => dew_point);

  // const maxT = Math.round(Math.max(...data_temp) / 5) * 5 + 5;
  // const minT = Math.round(Math.min(...data_dew_point) / 5) * 5 - 5;

  const options: ChartOptions<"line"> = {
    responsive: false,
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
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    // plugins: [
    //   {
    //     beforeInit: (chart) => {
    //       const ctx = chart.ctx;
    //       const dataset = chart.data.datasets[0];
    //       const meta = chart.getDatasetMeta(0);

    //       meta.data.forEach((point, index) => {
    //         const icon = () => (
    //           <WeatherIcon weatherId={800} current={false} size="1rem" />
    //         );
    //         const { x, y } = point.getProps(["x", "y"], true);

    //         ctx.save();
    //         ctx.font = "20px FontAwesome";
    //         ctx.fillText(icon, x - 10, y + 10);
    //         ctx.restore();
    //       });
    //     },
    //   },
    // ],
  };

  const data: ChartData<"line"> = {
    labels: dataTime,
    datasets: [
      {
        label: units === "imperial" ? "Temp [℉]" : "Temp [℃]",
        borderColor: pink[500],
        backgroundColor: pink[500],
        data: data_temp,
        yAxisID: "y",
      },
      // {
      //   label: units === "imperial" ? "Dew Point [℉]" : "Dew Point [℃]",
      //   borderColor: deepOrange[900],
      //   backgroundColor: deepOrange[900],
      //   data: data_dew_point,
      //   yAxisID: "y",
      // },
    ],
  };

  return <Line options={options} data={data} height={height} width="2000px" />;
};

export default memo(ChartTempWeather);

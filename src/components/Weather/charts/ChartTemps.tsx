import { memo } from "react";
import { pink, deepOrange } from "@material-ui/core/colors";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartTemps = ({ chartData, dataTime, units }: ChartProps) => {
  const data_temp = chartData.map(({ temp }) => temp);
  const data_dew_point = chartData.map(({ dew_point }) => dew_point);

  // const maxT = Math.round(Math.max(...data_temp) / 5) * 5 + 5;
  // const minT = Math.round(Math.min(...data_dew_point) / 5) * 5 - 5;

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
      {
        label: units === "imperial" ? "Dew Point [℉]" : "Dew Point [℃]",
        borderColor: deepOrange[900],
        backgroundColor: deepOrange[900],
        data: data_dew_point,
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default memo(ChartTemps);

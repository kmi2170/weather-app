import { memo } from "react";
import { blue } from "@material-ui/core/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { ChartProps, WeatherMinutely } from "../../../api/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartMinutelyProps extends Omit<ChartProps, "chartData"> {
  chartData: WeatherMinutely;
}

const ChartMinutely = ({ chartData, dataTime, units }: ChartMinutelyProps) => {
  let isFall = false;
  const data_precipitation: number[] = chartData?.map(({ precipitation }) => {
    if (precipitation > 0) isFall = true;
    return units === "imperial" ? precipitation / 25.4 : precipitation;
  });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: isFall
          ? units === "imperial"
            ? "Precipitation for the next 1 Hour [in]"
            : "Precipitation for the next 1 Hour [mm]"
          : "No Precipitation for the next 1 Hour",
      },
    },
    // scales: {
    //   y: {
    //     min: 0.01,
    //   },
    // },
  };

  const data: ChartData<"bar"> = {
    labels: dataTime,
    datasets: [
      {
        label: "Precipitation",
        backgroundColor: blue[500],
        borderColor: blue[900],
        data: data_precipitation,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default memo(ChartMinutely);

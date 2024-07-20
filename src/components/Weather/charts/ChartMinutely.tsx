import { memo } from "react";
import { blue } from "@mui/material/colors";
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
  const data_precipitation: number[] = chartData?.map(({ precipitation }) => {
    return units === "imperial" ? precipitation / 25.4 : precipitation;
  });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data: ChartData<"bar"> = {
    labels: dataTime,
    datasets: [
      {
        label:
          units === "imperial" ? "Precipitation [in]" : "Precipitation [mm]",
        borderColor: blue[500],
        backgroundColor: blue[500],
        data: data_precipitation,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default memo(ChartMinutely);

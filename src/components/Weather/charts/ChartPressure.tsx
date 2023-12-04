import { useState, useEffect, memo } from "react";
import { brown } from "@material-ui/core/colors";
import { ChartOptions, ChartData } from "chart.js";

import { ChartProps } from "../../../api/types";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartPressure = ({ chartData, dataTime, units }: ChartProps) => {
  const [data, setData] = useState<ChartData | null>(null);

  const data_pressure = chartData.map(({ pressure }) =>
    units === "imperial" ? (pressure / 1013.25) * 29.921 : pressure
  );

  const options: ChartOptions = {
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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setData({
      labels: dataTime,
      datasets: [
        {
          label: units === "imperial" ? "Pressure [inHg]" : "Pressure [hPa]",
          borderColor: brown[500],
          backgroundColor: brown[500],
          data: data_pressure,
          yAxisID: "y",
        },
      ],
    });
  }, [chartData]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!data) return null;

  return <Line options={options} data={data} />;
};

export default memo(ChartPressure);

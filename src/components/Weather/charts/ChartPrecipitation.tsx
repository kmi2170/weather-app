import { useState, useEffect, memo } from "react";
import { blue, grey } from "@material-ui/core/colors";
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

const ChartPrecipitation = ({ chartData, dataTime, units }: ChartProps) => {
  const [data, setData] = useState<ChartData<"line"> | null>(null);

  const fall = (fall: number) => (units === "imperial" ? +fall / 25.4 : fall);

  const data_rain = chartData.map((el) =>
    el.rain && el.rain["1h"] ? fall(el.rain["1h"]) : 0
  );
  const data_snow = chartData.map((el) =>
    el.snow && el.snow["1h"] ? fall(el.snow["1h"]) : 0
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
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setData({
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
    });
  }, [chartData]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!data) return null;

  return <Line options={options} data={data} />;
};

export default memo(ChartPrecipitation);

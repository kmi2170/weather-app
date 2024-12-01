import { ChartOptions } from "chart.js";

export const createChartOptions = ({
  yMax,
  yMin,
}: {
  yMax: number;
  yMin: number;
}): ChartOptions<"line"> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
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
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: { maxTicksLimit: 24 },
      },
      y: {
        border: { display: false },
        max: yMax,
        min: yMin,
      },
    },
  };
};

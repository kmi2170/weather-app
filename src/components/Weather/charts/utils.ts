import { SxProps } from "@mui/material";
import { BackGroundRanges } from "../../../api/types/weather";
import theme from "../../../theme/theme";
import { ChartOptions, Plugin } from "chart.js";

export const createBackgroundPlugin = (
  backgroundRanges: BackGroundRanges[]
): Plugin => {
  return {
    id: "backgroundPlugin",
    beforeDraw: (chart) => {
      const {
        ctx,
        chartArea: { left, right, top, bottom },
        scales: { x },
      } = chart;
      ctx.save();

      ctx.fillStyle = "rgba(35, 42, 41, 0.2)";
      ctx.fillRect(left, top, right - left, bottom - top);
      const xSpan = right - left;
      const ranges = backgroundRanges;

      ranges.forEach((range) => {
        const start = range.start * xSpan;
        const end = range.end * xSpan;
        ctx.clearRect(left + start, top, end - start, bottom - top);
        ctx.fillStyle = "rgba(255, 248, 220, 0.50)";
        ctx.fillRect(left + start, top, end - start, bottom - top);
      });
      ctx.restore();
    },
  };
};

export const chartBoxStyle: SxProps = {
  padding: "5px 10px",
  borderRadius: "10px",
  boxShadow: `3px 3px 3px ${theme.palette.primary.light}`,
  border: `1px solid ${theme.palette.primary.light}`,
};

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

// export const createBackgroundPluginForLabelsInString = (
//   backgroundRanges: BackGroundRages[]
// ) => {
//   return {
//     id: "backgroundPlugin",
//     beforeDraw: (chart) => {
//       const {
//         ctx,
//         chartArea: { left, right, top, bottom },
//         scales: { x },
//       } = chart;
//       ctx.save();
//       ctx.fillStyle = "rgba(255, 248, 220, 0.35)";
//       ctx.fillRect(left, top, right - left, bottom - top);

//       const ranges = backgroundRanges;
//       ranges.forEach((range) => {
//         const start = x.getPixelForValue(range.start);
//         const end = x.getPixelForValue(range.end);
//         ctx.fillStyle = range.color;
//         ctx.fillRect(start, top, end - start, bottom - top);
//       });
//     },
//   };
// };

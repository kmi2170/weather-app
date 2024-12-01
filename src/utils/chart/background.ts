import { BackGroundRanges } from "../../api/types/weather";
import { Plugin } from "chart.js";

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

import { Plugin } from "chart.js";

export const verticalLineOnHover: Plugin = {
  id: "verticalLineOnHover",
  beforeDatasetsDraw(chart, args, plugins) {
    const {
      ctx,
      chartArea: { top, bottom, height },
    } = chart;

    ctx.save();

    chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
      if (dataPoint.active === true) {
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(dataPoint.x, top);
        ctx.lineTo(dataPoint.x, bottom);
        ctx.stroke();
      }
    });
  },
};

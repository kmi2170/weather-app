import moment from "moment-timezone";

export const formatDigits = (x: string | number, d: number) =>
  x
    ? (+x).toLocaleString("en-US", {
        maximumFractionDigits: d,
        minimumFractionDigits: d,
      })
    : "N/A";

export const pressureWithUnit = (p: string, units: string) =>
  units === "imperial"
    ? `${formatDigits((+p / 1013.25) * 29.921, 1)} inHg`
    : `${p} hPa`;

export const fallWithUnit = (fall: string, units: string) =>
  units === "imperial" ? `${formatDigits(+fall / 25.4, 2)} in` : `${fall} mm`;

export const visibilityWithUnit = (v: string, units: string) =>
  units === "imperial"
    ? `${formatDigits(+v / 10000 / 1.609344, 1)} mi`
    : `${formatDigits(+v / 1000, 1)} km`;

export const timeLocalwithTZ = (dt: string, tzone: string) =>
  moment(new Date(+dt * 1000).toUTCString())
    .tz(tzone)
    .format("h:mm a");

export const timeLocalwithTZforChart = (dt: number, tzone: string) =>
  moment(new Date(+dt * 1000).toUTCString())
    .tz(tzone)
    // .format("MM/DD h a");
    .format("DD ddd h a");

export const tempWithUnit = (t: string, units: string) =>
  units === "imperial" ? (
    <span>
      {formatDigits(t, 0)}
      <small>&#8457;</small>
    </span>
  ) : (
    <span>
      {formatDigits(t, 0)}
      <small>&#8451;</small>
    </span>
  );

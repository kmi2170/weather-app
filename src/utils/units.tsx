import { formatDigits } from "./formatDigits";
import { timeWithTZ } from "./time";

export const pressureWithUnit = (p: number, units: string) =>
  units === "imperial"
    ? `${formatDigits((+p / 1013.25) * 29.921, 1)} inHg`
    : `${p} hPa`;

export const precipitationWithUnit = (precipitation: number, units: string) =>
  units === "imperial"
    ? `${formatDigits(precipitation / 25.4, 2)} in`
    : `${formatDigits(precipitation, 1)} mm`;

export const visibilityWithUnit = (v: number, units: string) =>
  units === "imperial"
    ? `${formatDigits(+v / 10000 / 1.609344, 1)} mi`
    : `${formatDigits(+v / 1000, 1)} km`;

export const tempWithUnit = (t: number, units: string) => (
  <span>
    {formatDigits(+t, 0)}
    {units === "imperial" ? <small> °F </small> : <small> °C</small>}
  </span>
);

export const isDay = (t: number, sunrise: number, sunset: number) => {
  if (t == null || sunrise == null || sunset == null) {
    return true;
  }

  return sunrise <= t && t <= sunset;
};

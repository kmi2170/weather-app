import { formatDigits } from './formatDigits';

export const pressureWithUnit = (p: string, units: string) =>
  units === 'imperial'
    ? `${formatDigits(+p / 1013.25 * 29.921, 1)} inHg`
    : `${p} hPa`;

export const fallWithUnit = (fall: string, units: string) =>
  units === 'imperial' ? `${formatDigits(+fall / 25.4, 2)} in` : `${fall} mm`;

export const visibilityWithUnit = (v: string, units: string) =>
  units === 'imperial'
    ? `${formatDigits(+v / 10000 / 1.609344, 1)} mi`
    : `${formatDigits(+v / 1000, 1)} km`;

export const tempWithUnit = (t: string, units: string) => (
  <span>
    {formatDigits(+t, 0)}
    {units === 'imperial' ? <small>&#8457;</small> : <small>&#8451;</small>}
  </span>
);

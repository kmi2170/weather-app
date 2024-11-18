export const pressureWithUnit = (p: number, units: string) =>
  units === "imperial"
    ? `${((+p / 1013.25) * 29.921).toFixed(1)} inHg`
    : `${p} hPa`;

export const precipitationWithUnit = (precipitation: number, units: string) =>
  units === "imperial"
    ? `${(precipitation / 25.4).toFixed(2)} in`
    : `${precipitation.toFixed(1)} mm`;

export const visibilityWithUnit = (v: number, units: string) =>
  units === "imperial"
    ? `${(v / 1000 / 1.609344).toFixed(1)} mi`
    : `${(v / 1000).toFixed(1)} km`;

export const tempWithUnit = (t: number, units: string) => (
  <span>
    {t.toFixed(0)}
    {units === "imperial" ? <small> °F </small> : <small> °C</small>}
  </span>
);

export const isDay = (t: number, sunrise: number, sunset: number) => {
  if (t == null || sunrise == null || sunset == null) {
    return true;
  }

  return sunrise <= t && t <= sunset;
};

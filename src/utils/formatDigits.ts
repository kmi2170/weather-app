export const formatDigits = (value: number, max: number, min: number) => {
  return value.toLocaleString('en-US', {
    maximumFractionDigits: max,
    minimumFractionDigits: min,
  });
};

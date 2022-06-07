export const formatDigits = (value: number, numDigits: number = 0) => {
  return value.toLocaleString('en-US', {
    maximumFractionDigits: numDigits,
    minimumFractionDigits: numDigits,
  });
};

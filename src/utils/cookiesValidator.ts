export const isUnitsValid = (units: unknown) => {
  if (
    units &&
    typeof units === "string" &&
    (units === "imperial" || units === "metric")
  ) {
    return true;
  }
  return false;
};

const keysToCheck = ["city", "region", "country", "lat", "lon"];

export const isLocationValid = (location: unknown) => {
  if (location && typeof location == "object") {
    const keys = Object.keys(location);
    for (const key of keys) {
      if (keysToCheck.includes(key)) {
        if (location[key]) return true;
      }
      return false;
    }
  }
  return false;
};

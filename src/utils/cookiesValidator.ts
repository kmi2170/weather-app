export const isUnitsValid = (units: any) => {
  if (
    units &&
    typeof units === 'string' &&
    (units === 'imperial' || units === 'metric')
  ) {
    return true;
  }

  return false;
};

const keysToCheck = ['city', 'region', 'country', 'lat', 'lon'];

export const isLocationValid = (location: any) => {
  if (location && typeof location == 'object') {
    const keys = Object.keys(location);
    if (JSON.stringify(keys) === JSON.stringify(keysToCheck)) {
      return true;
    }

    return false;
  }

  return false;
};

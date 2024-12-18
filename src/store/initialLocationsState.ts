import { LocationType } from "../api/types/weather";

export const initialLocationsState: LocationsStateType = {
  locations: [],
  isLoading: false,
  isError: false,
};

export type LocationsStateType = {
  locations: LocationType[];
  isLoading: boolean;
  isError: boolean;
};

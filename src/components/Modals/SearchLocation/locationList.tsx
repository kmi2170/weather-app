import { LocationType } from "../../../api/types/weather";
import { LocationListItem } from "./locationListItem";

type LocationsListProps = {
  locations: LocationType[];
  selectedLocationIndex: number;
  handleClickLocation(selectedIdx: number): void;
  handleHoverLocation(selectedIdx: number): void;
};

export type LocationItemType = {
  name: string;
  admin1: string;
  admin2: string;
  country: string;
};

export function LocationList(props: LocationsListProps) {
  const {
    locations,
    selectedLocationIndex,
    handleClickLocation,
    handleHoverLocation,
  } = props;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      {locations?.map((location, i) => (
        <LocationListItem
          key={i}
          index={i}
          location={location}
          isSelected={selectedLocationIndex === i}
          handleClickLocation={handleClickLocation}
          handleHoverLocation={handleHoverLocation}
        />
      ))}
    </div>
  );
}

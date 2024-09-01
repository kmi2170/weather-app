import { memo } from "react";

import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

import { LocationItemType } from "./locationList";

type LocationListItemProps = {
  index: number;
  location: LocationItemType;
  isSelected: boolean;
  handleClickLocation(selectedIdx: number): void;
  handleHoverLocation(selectedIdx: number): void;
};

export const LocationListItem = memo(function LocationListItem(
  props: LocationListItemProps
) {
  const {
    index,
    location,
    isSelected,
    handleClickLocation,
    handleHoverLocation,
  } = props;

  const bgColor = (theme: Theme) =>
    isSelected
      ? theme.palette.primary.main
      : index % 2 === 1
      ? theme.palette.primary.light
      : grey[100];
  const textColor = isSelected ? "white" : "black";
  const fontWeight = isSelected ? "bold" : "normal";

  const { name, admin1, admin2, country } = location;
  let locationName = `${name}, `;
  if (admin1) locationName += `${admin1}, `;
  if (admin2) locationName += `${admin2}, `;
  locationName += `${country}`;
  console.log(index, name);

  return (
    <Typography
      variant="h6"
      sx={(theme) => ({
        color: textColor,
        backgroundColor: bgColor(theme),
        fontWeight: fontWeight,
        padding: "0.25rem 0.5rem",
      })}
      onClick={() => handleClickLocation(index)}
      onMouseEnter={() => handleHoverLocation(index)}
    >
      {locationName}
    </Typography>
  );
});

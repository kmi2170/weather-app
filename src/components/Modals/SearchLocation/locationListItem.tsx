import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

import { LocationType } from "../../../api/types/weather";
import { memo } from "react";

type LocationListItemProps = {
  index: number;
  location: LocationType;
  isSelected: boolean;
  handleClickLocation(selectedIdx: number): void;
  handleHoverLocation(selectedIdx: number): void;
};

export const LocationListItem = memo((props: LocationListItemProps) => {
  const {
    index,
    location,
    isSelected,
    handleClickLocation,
    handleHoverLocation,
  } = props;

  const { name, admin1, admin2, country } = location;
  let locationName = `${name}, `;
  if (admin1) locationName += `${admin1}, `;
  if (admin2) locationName += `${admin2}, `;
  locationName += `${country}`;

  const bgColor = (theme: Theme) =>
    isSelected
      ? theme.palette.primary.main
      : index % 2 === 1
      ? theme.palette.primary.light
      : grey[100];
  const textColor = isSelected ? "white" : "black";
  const fontWeight = isSelected ? "bold" : "normal";

  return (
    <Typography
      variant="h6"
      sx={(theme) => ({
        color: textColor,
        backgroundColor: bgColor(theme),
        fontWeight: fontWeight,
        padding: "0.35rem 0.75rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.85rem",
        },
      })}
      onClick={() => handleClickLocation(index)}
      onMouseEnter={() => handleHoverLocation(index)}
    >
      {locationName}
    </Typography>
  );
});

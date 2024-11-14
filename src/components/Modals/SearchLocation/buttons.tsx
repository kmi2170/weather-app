import { memo } from "react";

import Box from "@mui/material/Box";
import { ClearIcon, CloseIcon, MGlassIcon } from "../../../assets/icons";

export const MGlassButton = memo(() => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        left: 10,
        color: theme.palette.primary.main,
      })}
    >
      <MGlassIcon />
    </Box>
  );
});

export const ClearButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        right: 10,
        color: theme.palette.primary.main,
      })}
      onClick={onClick}
    >
      <ClearIcon />
    </Box>
  );
});

export const CloseButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        right: 20,
        color: theme.palette.primary.main,
      })}
      onClick={onClick}
    >
      <CloseIcon />
    </Box>
  );
});

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUnits } from "../../../slice/weatherSlice";
import { Units } from "../../../store/initialState";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { styled, Theme } from "@mui/material/styles";
import { useCustomCookies } from "../../../hooks/useCustomCookies";
import { isUnitsValid } from "../../../utils/cookiesValidator";
import { Typography } from "@mui/material";

const buttonSelected = (theme: Theme) => ({
  color: "white",
  background: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  "&:hover": {
    color: "white",
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
});

const buttonUnSelected = (theme: Theme) => ({
  color: theme.palette.primary.main,
  background: "transparent",
  borderColor: theme.palette.primary.main,
  "&:hover": {
    color: "white",
    background: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
  },
});

const CustomButton = styled(Button)<{ selected: boolean; units: string }>(
  ({ theme, selected, units }) => ({
    borderRadius: units === "imperial" ? "20px 0 0 20px" : "0 20px 20px 0",
    ...(selected ? buttonSelected(theme) : buttonUnSelected(theme)),
  })
);

const buttonProps = [
  { button_units: "imperial", button_symbol: "°F" },
  { button_units: "metric", button_symbol: "°C" },
];

const Buttons = () => {
  const units = useAppSelector((state) => state.weather.units);
  const dispatch = useAppDispatch();

  const { cookies, setUnitsCookie } = useCustomCookies();

  useEffect(() => {
    if (isUnitsValid(cookies.weather_units)) {
      dispatch(setUnits(cookies.weather_units as Units));
    }
  }, []);

  useEffect(() => {
    setUnitsCookie(units);
  }, [units]);

  const handleClick = (b_units: Units) => {
    if (b_units !== units) {
      dispatch(setUnits(b_units));
    }
  };

  return (
    <Tooltip title="Switch Units">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ButtonGroup color="primary" aria-label="switch units">
          {buttonProps.map(({ button_units, button_symbol }) => (
            <CustomButton
              key={button_units}
              variant={button_units === units ? "contained" : "outlined"}
              size="small"
              onClick={() => handleClick(button_units as Units)}
              selected={button_units === units}
              units={button_units}
            >
              <Typography variant="subtitle2">{button_symbol}</Typography>
            </CustomButton>
          ))}
        </ButtonGroup>
      </Box>
    </Tooltip>
  );
};

export default Buttons;

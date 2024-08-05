import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUnits } from "../../../slice/weatherSlice";
import { Units } from "../../../store/initialState";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { useCustomCookies } from "../../../hooks/useCustomCookies";
import { isUnitsValid } from "../../../utils/cookiesValidator";

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

const buttonTheme = (button_units: string, units: string, theme: Theme) =>
  button_units === units ? buttonSelected(theme) : buttonUnSelected(theme);

const buttonProps = [
  { button_units: "imperial", button_symbol: "℉" },
  { button_units: "metric", button_symbol: "℃" },
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
            <Button
              key={button_units}
              variant={button_units === units ? "contained" : "outlined"}
              size="small"
              onClick={() => handleClick(button_units as Units)}
              sx={(theme) => ({
                ...buttonTheme(button_units, units, theme),
                borderRadius:
                  button_units === "imperial"
                    ? "10px 0 0 10px"
                    : "0 10px 10px 0",
              })}
            >
              {button_symbol}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Tooltip>
  );
};

export default memo(Buttons);

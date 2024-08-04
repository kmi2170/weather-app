import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUnits } from "../../../features/weatherSlice";
import { Units } from "../../../features/initialState";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useCustomCookies } from "../../../hooks/useCustomCookies";
import { isUnitsValid } from "../../../utils/cookiesValidator";
import { purple } from "@mui/material/colors";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  buttonSelected: {
    color: "white",
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      color: "white",
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  buttonUnSelected: {
    color: theme.palette.primary.main,
    background: "transparent",
    borderColor: theme.palette.primary.main,
    "&:hover": {
      color: "white",
      background: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const buttonProps = [
  { button_units: "imperial", button_symbol: "℉" },
  { button_units: "metric", button_symbol: "℃" },
];

const Buttons = () => {
  const classes = useStyles();

  const units = useAppSelector((state) => state.weather.units);
  const dispatch = useAppDispatch();

  const { cookies, setUnitsCookie } = useCustomCookies();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isUnitsValid(cookies.weather_units)) {
      dispatch(setUnits(cookies.weather_units as Units));
    }
  }, []);

  useEffect(() => setUnitsCookie(units), [units]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleClick = (b_units: Units) => {
    if (b_units !== units) {
      dispatch(setUnits(b_units));
    }
  };

  return (
    <Tooltip title="Switch Units">
      <div className={classes.root}>
        <ButtonGroup color="primary" aria-label="switch units">
          {buttonProps.map(({ button_units, button_symbol }) => (
            <Button
              key={button_units}
              variant={button_units === units ? "contained" : "outlined"}
              size="small"
              onClick={() => handleClick(button_units as Units)}
              className={
                button_units === units
                  ? classes.buttonSelected
                  : classes.buttonUnSelected
              }
              style={{
                borderRadius:
                  button_units === "imperial"
                    ? "10px 0 0 10px"
                    : "0 10px 10px 0",
              }}
            >
              {button_symbol}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Tooltip>
  );
};

export default memo(Buttons);

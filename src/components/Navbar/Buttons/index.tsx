import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setUnits } from "../../../features/weatherSlice";
import { Units } from "../../../features/initialState";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import { useCustomCookies } from "../../../hooks/useCustomCookies";
import { isUnitsValid } from "../../../utils/cookiesValidator";
import { purple } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) => ({
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
    background: purple[500],
    borderColor: purple[500],
    "&:hover": {
      color: "white",
      background: purple[500],
      borderColor: purple[500],
    },
  },
  buttonUnSelected: {
    color: purple[500],
    background: "transparent",
    borderColor: purple[500],
    "&:hover": {
      color: "white",
      background: purple[800],
      borderColor: purple[800],
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

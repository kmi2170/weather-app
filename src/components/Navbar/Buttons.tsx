import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUnits, selectWeather } from "../../features/weatherSlice";
import { Units } from "../../features/initialState";

import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
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

const Component: React.FC = () => {
  const classes = useStyles();

  const { units } = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();

  //const handleClick = (e: React.MouseEvent<HTMLElement>) => {
  const handleClick = (t_units: Units) => {
    if (t_units !== units) {
      return dispatch(setUnits(t_units));
    }
  };

  const buttonProps = [
    { t_units: "imperial", t_symbol: "℉" },
    { t_units: "metric", t_symbol: "℃" },
  ];

  return (
    <>
      <Tooltip title="Switch Units">
        <div className={classes.root}>
          <ButtonGroup color="primary" aria-label="units switch">
            {buttonProps.map(({ t_units, t_symbol }) => (
              <Button
                key={t_units}
                variant={t_units === units ? "contained" : "outlined"}
                size="small"
                onClick={() => handleClick(t_units as Units)}
                className={
                  t_units === units
                    ? classes.buttonSelected
                    : classes.buttonUnSelected
                }
              >
                {t_symbol}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </Tooltip>
    </>
  );
};

export default Component;

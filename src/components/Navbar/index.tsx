import { forwardRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { purple, red } from "@mui/material/colors";

import { useAppSelector } from "../../app/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";
// import SwitchUnits from "./SwitchUnits";
import { Weather } from "../../api/types";
import Buttons from "./Buttons";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: purple[50],
  },
  toolBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textTransform: "capitalize",
    color: "#000",
    "&:hover": {
      color: purple[500],
    },
  },
  textAlerts: {
    textTransform: "capitalize",
    color: red[500],
    "&:hover": {
      color: purple[500],
    },
  },
  list: {
    display: "flex",
    flexDirection: "row",
  },
  listItem: {
    padding: "0 1rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 0.5rem",
    },
    borderBottom: `3px solid transparent`,
    "&:hover": {
      borderBottom: `3px solid ${purple[500]}`,
    },
  },
}));

const list = [
  { id: 1, name: "current" },
  { id: 2, name: "minutely" },
  { id: 3, name: "daily" },
  { id: 4, name: "hourly" },
];

const Navbar = (_, ref: React.MutableRefObject<HTMLDivElement[]>) => {
  const classes = useStyles();

  const units = useAppSelector((state) => state.weather.units);
  const lang = useAppSelector((state) => state.weather.lang);
  const location = useAppSelector((state) => state.weather.location);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });
  // const { alerts } = data as Weather;
  const isAlerts = !!(data as Weather)?.alerts;

  const handleMenuItemRefs = (id: number) => {
    window.scroll(0, ref?.current[+id - 1].offsetTop - 70);
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolBar}>
        <List dense disablePadding className={classes.list}>
          {list.map(({ id, name }) => (
            <ListItem
              key={id}
              dense
              disableGutters
              className={classes.listItem}
              onClick={() => handleMenuItemRefs(id)}
            >
              <Typography variant="h6" align="center" className={classes.text}>
                {name}
              </Typography>
            </ListItem>
          ))}

          {isAlerts && (
            <ListItem
              key={5}
              dense
              disableGutters
              alignItems="center"
              className={classes.listItem}
              onClick={() => handleMenuItemRefs(5)}
            >
              <Typography
                variant="h6"
                align="center"
                className={classes.textAlerts}
              >
                Alerts
              </Typography>
            </ListItem>
          )}
        </List>

        <Buttons />
        {/* <SwitchUnits /> */}
      </Toolbar>
    </AppBar>
  );
};

export default forwardRef(Navbar);

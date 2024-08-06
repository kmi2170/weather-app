import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { grey, purple, red } from "@mui/material/colors";

import { useAppSelector } from "../../store/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { Weather } from "../../api/types";
import Buttons from "./Buttons";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: "rgba(233, 213, 255, 0.8)",
    borderRadius: 0,
  },
  toolBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textTransform: "capitalize",
    color: theme.palette.primary.dark,
    "&:hover": {
      color: purple[500],
    },
    [theme.breakpoints?.down("sm")]: {
      fontSize: "1.0rem",
    },
  },
  textAlerts: {
    textTransform: "capitalize",
    color: red[500],
    fontSize: "1.0rem",
    "&:hover": {
      color: purple[500],
    },
  },
  textAlertsDisabled: {
    textTransform: "capitalize",
    color: grey[500],
    fontSize: "1.0rem",
  },
  list: {
    display: "flex",
    flexDirection: "row",
  },
  listItem: {
    padding: "0 1rem",
    [theme.breakpoints?.down("md")]: {
      padding: "0 0.5rem",
    },
    borderBottom: `3px solid transparent`,
    "&:hover": {
      borderBottom: `3px solid ${purple[500]}`,
    },
  },
  listItemDisabled: {
    padding: "0 1rem",
    [theme.breakpoints?.down("md")]: {
      padding: "0 0.5rem",
    },
    borderBottom: `3px solid transparent`,
  },
}));

const LinksList = [
  { id: 0, name: "current" },
  { id: 1, name: "minutely" },
  { id: 2, name: "daily" },
  { id: 3, name: "hourly" },
  // { id: 4, name: "alerts" },
];

const Navbar = () => {
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
  const isAlerts = !!(data as Weather)?.alerts;

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolBar}>
        <List dense disablePadding className={classes.list}>
          {LinksList.map(({ id, name }) => (
            <ListItem
              key={id}
              dense
              disableGutters
              className={classes.listItem}
            >
              <Link href={`#${name}`}>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.text}
                >
                  {name}
                </Typography>
              </Link>
            </ListItem>
          ))}

          <ListItem
            key={5}
            dense
            disableGutters
            alignItems="center"
            className={isAlerts ? classes.listItem : classes.listItemDisabled}
          >
            <Link href={`#${LinksList[4]}`}>
              <Typography
                variant="h6"
                align="center"
                className={
                  isAlerts ? classes.textAlerts : classes.textAlertsDisabled
                }
              >
                Alerts
              </Typography>
            </Link>
          </ListItem>
        </List>

        <Buttons />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

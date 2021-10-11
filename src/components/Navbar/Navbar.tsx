import { forwardRef } from "react";

import { AppBar, Toolbar, Typography, List, ListItem } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { purple, red } from "@material-ui/core/colors";

import { useAppSelector } from "../../app/hooks";
import { selectWeather } from "../../features/weatherSlice.ts";

import MenuComponent from "./Menu";

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
    [theme.breakpoints.down("sm")]: {
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

// interface NavbarProps {
//   itemRefs: HTMLElement[];
// }

const Navbar = (_, ref: React.MutableRefObject<HTMLDivElement[]>) => {
  const classes = useStyles();

  const { weatherOnecall } = useAppSelector(selectWeather);
  // const { alerts } = weatherOnecall ;
  const alerts = weatherOnecall?.alerts ? weatherOnecall.alerts : null;

  const handleItemRefs = (id: number) => {
    window.scroll(0, ref?.current[+id - 1].offsetTop - 70);
    // console.log(ref?.current[+id - 1]);
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
              onClick={() => handleItemRefs(id)}
            >
              <Typography variant="h6" align="center" className={classes.text}>
                {name}
              </Typography>
            </ListItem>
          ))}

          {alerts && (
            <ListItem
              key={5}
              dense
              disableGutters
              alignItems="center"
              className={classes.listItem}
              onClick={() => handleItemRefs(5)}
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
        <MenuComponent />
      </Toolbar>
    </AppBar>
  );
};

export default forwardRef(Navbar);

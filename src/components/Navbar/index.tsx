import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { grey } from "@mui/material/colors";

import { useAppSelector } from "../../store/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { Weather } from "../../api/types";
import Buttons from "./Buttons";
import Link from "next/link";
import { Box } from "@mui/material";
import { memo } from "react";

const LinksList = [
  { id: 0, name: "current" },
  { id: 1, name: "minutely" },
  { id: 2, name: "daily" },
  { id: 3, name: "hourly" },
  // { id: 4, name: "alerts" },
];

const Navbar = () => {
  const { units, location, lang } = useAppSelector((state) => state.weather);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });
  const isAlerts = !!(data as Weather)?.alerts;

  return (
    <AppBar
      position="sticky"
      sx={{ background: "rgba(233, 213, 255, 0.8)", borderRadius: 0 }}
    >
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <List
          dense
          disablePadding
          sx={(theme) => ({
            position: "relative",
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            "-ms-overflow-style": "none", // IE and Edge
            "scrollbar-width": "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, and Opera
            },
          })}
        >
          {LinksList.map(({ id, name }) => (
            <ListItem
              key={id}
              dense
              disableGutters
              sx={(theme) => ({
                padding: "0 1rem",
                [theme.breakpoints?.down("md")]: {
                  padding: "0 0.5rem",
                  // "&:hover": {
                  //   color: theme.palette.primary.main,
                  // },
                },
                // borderBottom: `3px solid transparent`,
                // "&:hover": {
                //   borderBottom: `3px solid ${theme.palette.primary.main}`,
                // },
              })}
            >
              <Link href={`#${name}`}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: theme.palette.primary.dark,
                    "&:active": {
                      color: theme.palette.primary.main,
                    },
                    [theme.breakpoints?.down("sm")]: {
                      fontSize: "1.0rem",
                    },
                  })}
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
            sx={(theme) => ({
              padding: "0 1rem",
              [theme.breakpoints?.down("md")]: {
                padding: "0 0.5rem",
              },
              // borderBottom: `3px solid transparent`,
              // "&:hover": isAlerts
              //   ? {
              //       borderBottom: `3px solid ${theme.palette.warning.light}`,
              //     }
              //   : undefined,
            })}
          >
            <Link href={`#alerts`}>
              <Typography
                variant="h6"
                align="center"
                sx={(theme) => ({
                  textTransform: "capitalize",
                  color: isAlerts ? theme.palette.warning.main : grey[500],
                  fontSize: "1.0rem",
                  "&:active": isAlerts
                    ? {
                        color: theme.palette.warning.light,
                      }
                    : undefined,
                })}
              >
                Alerts
              </Typography>
            </Link>
          </ListItem>
        </List>

        <MenuRightBlur />
        <MenuLeftBlur />

        <Buttons />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const MenuRightBlur = memo(() => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "15%",
        height: "100%",
        backgroundImage:
          "linear-gradient(90deg,rgba(233, 213, 255, 0.8), rgba(233, 213, 255, 0.0))",
      }}
    />
  );
});

const MenuLeftBlur = memo(() => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "30%",
        height: "100%",
        backgroundImage:
          "linear-gradient(90deg,rgba(233, 213, 255, 0.5), rgba(233, 213, 255, 0.8))",
      }}
    />
  );
});

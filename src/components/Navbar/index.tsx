import React, { memo, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { grey } from "@mui/material/colors";

import { useAppSelector } from "../../store/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { Weather } from "../../api/types/weather";
import Buttons from "./Buttons";
import Link from "next/link";
import { Box } from "@mui/material";

const LinksList = [
  { id: "top", name: "current" },
  { id: "minutely", name: "minutely" },
  { id: "forty-eight-hours", name: "48hours" },
  { id: "daily", name: "daily" },
  { id: "charts", name: "charts" },
  { id: "map", name: "map" },
];

const Navbar = () => {
  const { units, location, lang } = useAppSelector((state) => state.weather);

  const { data } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(`#${id}`);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top:
          element.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          40,
      });
      // element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isAlerts = !!(data as Weather)?.alerts;

  return (
    <AppBar
      position="sticky"
      sx={{ background: "rgba(233, 213, 255, 0.9)", borderRadius: 0 }}
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
            // paddingRight: "5rem",
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
                [theme.breakpoints?.down("md")]: { padding: "0 0.5rem" },
              })}
            >
              <Link href={`#${id}`} passHref>
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: theme.palette.primary.dark,
                    "&:active": { color: theme.palette.primary.main },
                    [theme.breakpoints?.down("sm")]: { fontSize: "1.0rem" },
                  })}
                  onClick={(e) => handleScroll(e, `${id}`)}
                >
                  {name}
                </Typography>
              </Link>
            </ListItem>
          ))}

          <ListItem
            key="alert"
            dense
            disableGutters
            alignItems="center"
            sx={(theme) => ({
              padding: "0 1rem",
              [theme.breakpoints?.down("md")]: { padding: "0 0.5rem" },
            })}
          >
            <Link href={`#alerts`} passHref>
              <Typography
                variant="h6"
                align="center"
                sx={(theme) => ({
                  textTransform: "capitalize",
                  color: isAlerts ? theme.palette.warning.main : grey[500],
                  fontSize: "1.0rem",
                  "&:active": isAlerts
                    ? { color: theme.palette.warning.light }
                    : undefined,
                })}
                onClick={(e) => {
                  if (isAlerts) {
                    console.log({ isAlerts });
                    handleScroll(e, `alerts`);
                  } else {
                    e.preventDefault();
                  }
                }}
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

export default memo(Navbar);

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
          "linear-gradient(90deg,rgba(233, 213, 255, 0.9), rgba(233, 213, 255, 0.0))",
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
          "linear-gradient(90deg,rgba(233, 213, 255, 0.5), rgba(233, 213, 255, 0.9))",
      }}
    />
  );
});

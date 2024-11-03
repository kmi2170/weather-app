import React, { memo, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
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
  { id: "alerts", name: "alerts" },
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

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggle = (newOpenDrawer: boolean) => {
    setOpenDrawer(newOpenDrawer);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(233, 213, 255, 0.9)",
        borderRadius: 0,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: "3.5rem",
          width: "100%",
          display: "flex",
          justifyContent: {
            xs: "space-between",
            md: "center",
          },
          alignItems: "center",
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Button onClick={() => toggle(true)}>
            <MenuIcon />
          </Button>
          <Drawer
            open={openDrawer}
            onClose={() => toggle(false)}
            sx={(theme) => ({
              "& .MuiDrawer-paper": {
                borderRadius: 0,
                backgroundColor: theme.palette.primary.light,
              },
            })}
          >
            <Box sx={{ width: 250 }}>
              <NavContent isAlerts={isAlerts} close={() => toggle(false)} />
            </Box>
          </Drawer>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <NavContent isAlerts={isAlerts} />
        </Box>

        <Buttons />
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);

type NavContentProps = { isAlerts: boolean; close?: () => void };

const NavContent = (props: NavContentProps) => {
  const { isAlerts, close } = props;

  const handleScrollToId = (e: React.MouseEvent, id: string) => {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: {
          xs: "2rem",
          md: "1rem",
        },
        marginTop: {
          xs: "3rem",
          md: 0,
        },
      }}
    >
      <List
        dense
        disablePadding
        sx={(theme) => ({
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: "1.25rem",
            md: 0,
          },
          paddingLeft: {
            xs: "2rem",
            md: 0,
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
              {id === "alerts" ? (
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
                    console.log({ isAlerts });
                    if (isAlerts) {
                      handleScrollToId(e, `alerts`);
                      if (close) {
                        close();
                      }
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  {name}
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: theme.palette.primary.dark,
                    "&:active": { color: theme.palette.primary.main },
                    [theme.breakpoints?.down("sm")]: {
                      fontSize: "1.0rem",
                    },
                  })}
                  onClick={(e) => {
                    handleScrollToId(e, `${id}`);
                    if (close) {
                      close();
                    }
                  }}
                >
                  {name}
                </Typography>
              )}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// const MenuRightBlur = memo(() => {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "1.5rem",
//         // width: "15%",
//         height: "100%",
//         border: "1px solid blue",
//         backgroundImage:
//           "linear-gradient(90deg,rgba(233, 213, 255, 0.9), rgba(233, 213, 255, 0.0))",
//       }}
//     />
//   );
// });

// const MenuLeftBlur = memo(() => {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         right: 0,
//         width: "1.5rem",
//         // width: "30%",
//         height: "100%",
//         border: "1px solid green",
//         backgroundImage:
//           "linear-gradient(90deg,rgba(233, 213, 255, 0.5), rgba(233, 213, 255, 0.9))",
//       }}
//     />
//   );
// });

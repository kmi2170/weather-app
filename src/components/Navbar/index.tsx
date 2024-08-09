import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { grey, red } from "@mui/material/colors";

import { useAppSelector } from "../../store/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { Weather } from "../../api/types";
import Buttons from "./Buttons";
import Link from "next/link";

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
      sx={{
        background: "rgba(233, 213, 255, 0.8)",
        borderRadius: 0,
      }}
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
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
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
                },
                borderBottom: `3px solid transparent`,
                "&:hover": {
                  borderBottom: `3px solid ${theme.palette.primary.main}`,
                },
              })}
            >
              <Link href={`#${name}`}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: theme.palette.primary.dark,
                    "&:hover": {
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
              borderBottom: `3px solid transparent`,
              "&:hover": isAlerts
                ? {
                    borderBottom: `3px solid ${theme.palette.warning.light}`,
                  }
                : undefined,
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
                  "&:hover": isAlerts
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

        <Buttons />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

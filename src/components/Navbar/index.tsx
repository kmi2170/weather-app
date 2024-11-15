import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppSelector } from "../../store/hooks";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { Weather } from "../../api/types/weather";
import Buttons from "./Buttons";
import { Box } from "@mui/material";
import NavContent from "./NavContent";

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
          <Button onClick={() => toggle(true)} aria-label="menu">
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
              display: { xs: "block", md: "none" },
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

export default Navbar;

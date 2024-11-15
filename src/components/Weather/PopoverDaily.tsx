import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { useAppSelector } from "../../store/hooks";
import { dayWithTZ, dateWithTZ } from "../../utils/time";
import { WeatherDaily } from "../../api/types/weather";
import Almanac from "./WeatherCurrent/Almanac";
import Others from "./WeatherCurrent/Others";

const PopoverWrapper = styled("div")(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: "15px",
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "15px",
  },
}));

interface PopoverDailyProps {
  children: React.ReactNode;
  data: WeatherDaily;
  timezone: string;
}

const PopoverDaily = ({ children, data, timezone }: PopoverDailyProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const units = useAppSelector((state) => state.weather.units);

  const {
    summary,
    clouds,
    humidity,
    pressure,
    uvi,
    rain,
    snow,
    sunrise,
    sunset,
    moonrise,
    moonset,
    moon_phase,
    temp,
  } = data;

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <PopoverWrapper
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </PopoverWrapper>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        transitionDuration={{ enter: 1000 }}
        sx={{ pointerEvents: "none" }}
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            pt: "0.75rem",
            pb: "1rem",
            backgroundColor: "lightcyan",
          }}
        >
          <Typography variant="h6" align="center">
            {dateWithTZ(data.dt, timezone)} {dayWithTZ(data.dt, timezone)}
          </Typography>
          {summary && (
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.primary.dark,
              })}
              align="center"
              noWrap={false}
            >
              {summary}
            </Typography>
          )}

          <Paper
            elevation={2}
            sx={{
              p: "0.75rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "palegreen",
            }}
          >
            {["morn", "day", "eve", "night"].map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignIterator: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography sx={{ textTransform: "capitalize" }}>
                  {item}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                >
                  {Number(temp[item]).toFixed(0)}
                  {units === "imperial" ? (
                    <small> °F </small>
                  ) : (
                    <small> °C</small>
                  )}
                </Typography>
              </Box>
            ))}
          </Paper>

          <Others
            rain={rain || 0}
            snow={snow}
            humidity={humidity}
            clouds={clouds}
            uvi={uvi}
            pressure={pressure}
            units={units}
          />

          <Almanac
            sunrise={sunrise}
            sunset={sunset}
            moonrise={moonrise}
            moonset={moonset}
            moon_phase={moon_phase}
            timezone={timezone}
          />
        </Container>
      </Popover>
    </>
  );
};

export default PopoverDaily;

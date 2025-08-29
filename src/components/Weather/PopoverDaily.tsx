import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { dayWithTZ, dateWithTZ } from "../../utils/time";
import { WeatherDaily } from "../../api/types/weather";
import Almanac from "./WeatherCurrent/Almanac";
import Details from "./WeatherCurrent/Details";
import { Units } from "../../store/initialState";
import { CloseButton } from "../Modals/SearchLocation/buttons";

const PopoverWrapper = styled("div")(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: "15px",
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "15px",
  },
}));

const DayWrapper = styled("span")({
  marginLeft: "0.25rem",
  color: "dodgerblue",
});

const TempWrapper = styled("div")({
  padding: "0.75rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
});

const TempSubWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignIterator: "center",
  marginBottom: "0.5rem",
});
interface PopoverDailyProps {
  children: React.ReactNode;
  data: WeatherDaily;
  timezone: string;
  units: Units;
}

const PopoverDaily = ({
  children,
  data,
  timezone,
  units,
}: PopoverDailyProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

  const handlePopoverOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
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
        onClick={handlePopoverOpen}
      >
        {children}
      </PopoverWrapper>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            pt: "1.5em",
            pb: "1rem",
            backgroundColor: "whitesmoke",
          }}
        >
          <Typography variant="h5" component="h6" align="center">
            {dateWithTZ(data.dt, timezone)}{" "}
            <DayWrapper>{dayWithTZ(data.dt, timezone)}</DayWrapper>
          </Typography>
          <CloseButton onClick={handlePopoverClose} top={10} right={10} />
          {summary && (
            <Paper elevation={2} sx={{ p: "0.5rem" }}>
              <Typography
                variant="h6"
                sx={() => ({
                  pt: "0.5rem",
                  color: "forestgreen",
                })}
                align="center"
                noWrap={false}
              >
                {summary}
              </Typography>
            </Paper>
          )}

          <TempWrapper>
            {["morn", "day", "eve", "night"].map((item) => (
              <TempSubWrapper key={item}>
                <Typography
                  variant="h5"
                  component="h6"
                  align="center"
                  sx={{ textTransform: "capitalize" }}
                >
                  {item}
                </Typography>
                <Typography
                  variant="h5"
                  component="h6"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                  align="center"
                >
                  {Number(temp[item]).toFixed(0)}
                  {units === "imperial" ? (
                    <small> °F </small>
                  ) : (
                    <small> °C</small>
                  )}
                </Typography>
              </TempSubWrapper>
            ))}
          </TempWrapper>

          <Details
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

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { yellow, orange } from "@mui/material/colors";

import MoonIcon from "../icons/MoonIcon";
import { timeWithTZ } from "../../../utils/time";

const AlmanacWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "2rem",
  alignItems: "center",
});

const SunLabel = styled("span")({
  borderBottom: `2px solid ${orange[500]}`,
});

const MoonLabel = styled("span")(({ theme }) => ({
  borderBottom: `2px solid ${yellow[500]}`,
}));

const IconSun = styled("i")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
  marginRight: "0.5rem",
}));

const IconMoon = styled("i")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
  marginRight: "0.5rem",
  marginLeft: "0.25rem",
}));

type AlmanacProps = {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  timezone: string;
};

const Almanac = (props: AlmanacProps) => {
  const { sunrise, sunset, moonrise, moonset, moon_phase, timezone } = props;

  return (
    <Paper
      elevation={2}
      sx={{ padding: "1rem 2rem", background: "lightyellow" }}
    >
      <AlmanacWrapper>
        <Typography variant="subtitle2">
          <SunLabel>Sun</SunLabel>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <IconSun className="wi wi-sunrise" />
          {timeWithTZ(sunrise, timezone)}
        </Typography>
        <Typography variant="subtitle2">
          <IconSun className="wi wi-sunset" />
          {timeWithTZ(sunset, timezone)}
        </Typography>
      </AlmanacWrapper>

      <AlmanacWrapper>
        <Typography variant="subtitle2">
          <MoonLabel>Moon</MoonLabel>
          &nbsp;
          <IconMoon className="wi wi-moonrise" />
          {timeWithTZ(moonrise, timezone)}
        </Typography>
        <Typography variant="subtitle2">
          <IconMoon className="wi wi-moonset" />
          {timeWithTZ(moonset, timezone)}
        </Typography>
      </AlmanacWrapper>
      <MoonIcon moon_phase={moon_phase} />
    </Paper>
  );
};

export default Almanac;

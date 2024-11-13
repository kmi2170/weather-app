import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { yellow, orange } from "@mui/material/colors";

import MoonPhaseWithIcon from "../icons/MoonPhaseWithIcon";
import { timeWithTZ } from "../../../utils/time";

export const AlmanacWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "2rem",
  alignItems: "center",
});

export const SunLabel = styled(Typography)({
  width: "2rem",
  borderBottom: `2px solid ${orange[500]}`,
});

export const MoonLabel = styled(Typography)({
  width: "2rem",
  borderBottom: `2px solid ${yellow[500]}`,
});

export const IconSun = styled("i")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
  marginRight: "0.5rem",
}));

export const IconMoon = styled("i")(({ theme }) => ({
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
        <SunLabel>Sun</SunLabel>
        <Typography variant="subtitle2">
          <IconSun className="wi wi-sunrise" />
          {timeWithTZ(sunrise, timezone)}
        </Typography>
        <Typography variant="subtitle2">
          <IconSun className="wi wi-sunset" />
          {timeWithTZ(sunset, timezone)}
        </Typography>
      </AlmanacWrapper>

      <AlmanacWrapper>
        <MoonLabel>Moon</MoonLabel>
        <Typography variant="subtitle1">
          <IconMoon className="wi wi-moonrise" />
          {timeWithTZ(moonrise, timezone)}
        </Typography>
        <Typography variant="subtitle1">
          <IconMoon className="wi wi-moonset" />
          {timeWithTZ(moonset, timezone)}
        </Typography>
      </AlmanacWrapper>
      <MoonPhaseWithIcon moon_phase={moon_phase} />
    </Paper>
  );
};

export default Almanac;

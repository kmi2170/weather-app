import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import MoonPhaseWithIcon from "../icons/MoonPhaseWithIcon";
import { timeWithTZ } from "../../../utils/time";

export const AlmanacWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "0.25rem",
  alignItems: "center",
});

export const SunLabel = styled(Typography)({
  width: "2.5rem",
  marginRight: "0.5rem",
});

export const MoonLabel = styled(SunLabel)({});

export const IconSun = styled("i")(({ theme }) => ({
  width: "1.25rem",
  fontSize: "1rem",
  color: theme.palette.primary.main,
}));

export const IconMoon = styled(IconSun)({
  padding: "0 0.25rem",
});

export const Time = styled(Typography)({
  width: "4.5rem",
});

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
        <SunLabel align="center">Sun</SunLabel>
        <IconSun className="wi wi-sunrise" />
        <Time variant="subtitle1" align="right" sx={{ mr: "1.0rem" }}>
          {timeWithTZ(sunrise, timezone)}
        </Time>
        <IconSun className="wi wi-sunset" />
        <Time variant="subtitle1" align="right">
          {timeWithTZ(sunset, timezone)}
        </Time>
      </AlmanacWrapper>

      <AlmanacWrapper>
        <MoonLabel>Moon</MoonLabel>
        <IconMoon className="wi wi-moonrise" />
        <Time variant="subtitle1" align="right" sx={{ mr: "1.0rem" }}>
          {timeWithTZ(moonrise, timezone)}
        </Time>
        <IconMoon className="wi wi-moonset" />
        <Time variant="subtitle1" align="right">
          {timeWithTZ(moonset, timezone)}
        </Time>
      </AlmanacWrapper>
      <MoonPhaseWithIcon moon_phase={moon_phase} />
    </Paper>
  );
};

export default Almanac;

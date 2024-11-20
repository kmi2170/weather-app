import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";

import MoonPhaseWithIcon from "../icons/MoonPhaseWithIcon";
import { timeWithTZ } from "../../../utils/time";

export const AlmanacWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "1rem",
  alignItems: "center",
  marginBottom: "0.25rem",
});

export const AlmanacSubWrapper = styled("div")({
  flex: 0.5,
});

export const LabelWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "0.5rem",
  alignItems: "center",
});

export const IconSun = styled("i")(({ theme }) => ({
  fontSize: "1.25rem",
  color: theme.palette.primary.main,
}));

export const IconMoon = styled(IconSun)({
  padding: "0 0.25rem",
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

  const theme = useTheme();
  const fontColor = theme.palette.primary.dark;

  return (
    <Paper
      elevation={2}
      sx={{
        pt: "1rem",
        pb: "1rem",
        pl: { xs: "1rem", lg: "2rem" },
        pr: { xs: "1rem", lg: "2rem" },
        background: "lightyellow",
      }}
    >
      <AlmanacWrapper>
        <AlmanacSubWrapper>
          <LabelWrapper>
            <IconSun className="wi wi-sunrise" />
            <Typography variant="subtitle2">Sun Rise</Typography>
          </LabelWrapper>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {timeWithTZ(sunrise, timezone)}
          </Typography>
        </AlmanacSubWrapper>
        <AlmanacSubWrapper>
          <LabelWrapper>
            <IconSun className="wi wi-sunset" />
            <Typography variant="subtitle2">Sun Set</Typography>
          </LabelWrapper>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {timeWithTZ(sunset, timezone)}
          </Typography>
        </AlmanacSubWrapper>
      </AlmanacWrapper>

      <AlmanacWrapper>
        <AlmanacSubWrapper>
          <LabelWrapper>
            <IconMoon className="wi wi-moonrise" />
            <Typography variant="subtitle2">Moon Rise</Typography>
          </LabelWrapper>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {timeWithTZ(moonrise, timezone)}
          </Typography>
        </AlmanacSubWrapper>
        <AlmanacSubWrapper>
          <LabelWrapper>
            <IconMoon className="wi wi-moonset" />
            <Typography variant="subtitle2">Moon Set</Typography>
          </LabelWrapper>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {timeWithTZ(moonset, timezone)}
          </Typography>
        </AlmanacSubWrapper>
      </AlmanacWrapper>
      <MoonPhaseWithIcon moon_phase={moon_phase} />
    </Paper>
  );
};

export default Almanac;

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";

import {
  precipitationWithUnit,
  pressureWithUnit,
  visibilityWithUnit,
} from "../../../utils/units";
import { Units } from "../../../store/initialState";
import { EyeIcon } from "../../../assets/icons";

const DataWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "0.5rem",
});

const Wrapper = styled("div")({
  flex: 0.5,
});

export const Icon = styled("i")(({ theme }) => ({
  width: "1.25rem",
  fontSize: "1.25rem",
}));

export const EyeIconWrapper = styled("i")(({}) => ({
  height: "1.5rem",
  color: "grey",
}));

export const Label = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "0.5rem",
  alignItems: "center",
});

type Details = {
  rain: number;
  snow?: number;
  humidity: number;
  pressure: number;
  visibility?: number;
  clouds?: number;
  uvi: number;
  units: Units;
};

const Details = (props: Details) => {
  const { rain, snow, humidity, pressure, visibility, clouds, uvi, units } =
    props;

  const _snow = snow || 0;

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
        background: "snow",
      }}
    >
      <DataWrapper>
        <Wrapper>
          <Label>
            <Icon className="wi wi-raindrops" sx={{ color: "dodgerblue" }} />
            <Typography variant="subtitle2">Rain</Typography>
          </Label>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {precipitationWithUnit(rain, units)}
          </Typography>
        </Wrapper>
        <Wrapper>
          <Label>
            <Icon className="wi wi-barometer" sx={{ color: "maroon" }} />
            <Typography variant="subtitle2">Pressure</Typography>
          </Label>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {pressureWithUnit(pressure, units)}
          </Typography>
        </Wrapper>
      </DataWrapper>

      <DataWrapper>
        <Wrapper>
          <Label>
            <Icon
              className="wi wi-snowflake-cold"
              sx={{ color: "lightsteelblue" }}
            />
            <Typography
              variant="subtitle2"
              color={_snow === 0 ? "lightgrey" : "black"}
            >
              Snow
            </Typography>
          </Label>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            color={_snow === 0 ? "lightgrey" : fontColor}
          >
            {precipitationWithUnit(_snow, units)}
          </Typography>
        </Wrapper>
        <Wrapper>
          <Label>
            <Icon className="wi wi-day-sunny" sx={{ color: "purple" }} />
            <Typography variant="subtitle2">UV Index</Typography>
          </Label>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {uvi.toFixed(0)}
          </Typography>
        </Wrapper>
      </DataWrapper>

      <DataWrapper>
        <Wrapper>
          <Label>
            <Icon className="wi wi-humidity" sx={{ color: "lightskyblue" }} />
            <Typography variant="subtitle2">Humidity</Typography>
          </Label>
          <Typography
            variant="h5"
            component="h6"
            align="center"
            sx={{ color: fontColor }}
          >
            {humidity} %
          </Typography>
        </Wrapper>
        {visibility && (
          <Wrapper>
            <Label>
              <EyeIconWrapper>
                <EyeIcon />
              </EyeIconWrapper>
              <Typography variant="subtitle2">Visibility</Typography>
            </Label>
            <Typography
              variant="h5"
              component="h6"
              align="center"
              sx={{ color: fontColor }}
            >
              {visibilityWithUnit(visibility, units)}
            </Typography>
          </Wrapper>
        )}
        {clouds && (
          <Wrapper>
            <Label>
              <Icon className="wi wi-cloud" sx={{ color: "dimgray" }} />
              <Typography variant="subtitle2">Cloudiness</Typography>
            </Label>
            <Typography
              variant="h5"
              component="h6"
              align="center"
              sx={{ color: fontColor }}
            >
              {clouds.toFixed(0)} %
            </Typography>
          </Wrapper>
        )}
      </DataWrapper>
    </Paper>
  );
};

export default Details;

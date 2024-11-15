import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import {
  precipitationWithUnit,
  pressureWithUnit,
  visibilityWithUnit,
} from "../../../utils/units";
import { WeatherCurrent } from "../../../api/types/weather";
import { Units } from "../../../store/initialState";

const DataWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

type Others = {
  rain: number;
  snow?: number;
  humidity: number;
  pressure: number;
  visibility?: number;
  clouds?: number;
  uvi: number;
  units: Units;
};

const Others = (props: Others) => {
  const { rain, snow, humidity, pressure, visibility, uvi, units } = props;

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "1rem 2rem",
        background: "snow",
        display: "flex",
        flexDirection: "row",
        gap: "1.5rem",
      }}
    >
      <DataWrapper>
        <Typography variant="subtitle1" sx={{ color: "dodgerblue" }}>
          Rain {precipitationWithUnit(rain, units)}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "deepskyblue" }}>
          Humidity {humidity} %
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "maroon" }}>
          Pressure {pressureWithUnit(pressure, units)}
        </Typography>
      </DataWrapper>

      <DataWrapper>
        {snow && (
          <Typography variant="subtitle1" sx={{ color: "dodgerblue" }}>
            Snow {precipitationWithUnit(snow, units)}
          </Typography>
        )}
        {visibility && (
          <Typography variant="subtitle1" sx={{ color: "limegreen" }}>
            Visibility {visibilityWithUnit(visibility, units)}
          </Typography>
        )}
        <Typography variant="subtitle1" sx={{ color: "darkmagenta" }}>
          UV index {uvi}
        </Typography>
      </DataWrapper>
    </Paper>
  );
};

export default Others;

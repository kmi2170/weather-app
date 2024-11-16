import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import {
  precipitationWithUnit,
  pressureWithUnit,
  visibilityWithUnit,
} from "../../../utils/units";
import { Units } from "../../../store/initialState";
import { clouds } from "../../../constants/legends";

const DataWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

type OtherData = {
  rain: number;
  snow?: number;
  humidity: number;
  pressure: number;
  visibility?: number;
  clouds?: number;
  uvi: number;
  units: Units;
};

const OtherData = (props: OtherData) => {
  const { rain, snow, humidity, pressure, visibility, clouds, uvi, units } =
    props;

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "1rem 1rem",
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
        {snow && (
          <Typography variant="subtitle1" sx={{ color: "dodgerblue" }}>
            Snow {precipitationWithUnit(snow, units)}
          </Typography>
        )}
      </DataWrapper>

      <DataWrapper>
        <Typography variant="subtitle1" sx={{ color: "deepskyblue" }}>
          Humidity {humidity} %
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "maroon" }}>
          Pressure {pressureWithUnit(pressure, units)}
        </Typography>
        {visibility && (
          <Typography variant="subtitle1" sx={{ color: "limegreen" }}>
            Visibility {visibilityWithUnit(visibility, units)}
          </Typography>
        )}
        {clouds && (
          <Typography variant="subtitle1" sx={{ color: "dimgrey" }}>
            Cloud Cover {clouds.toFixed(0)} %
          </Typography>
        )}
      </DataWrapper>

      <DataWrapper>
        <Typography variant="subtitle1" sx={{ color: "darkmagenta" }}>
          UV {uvi}
        </Typography>
      </DataWrapper>
    </Paper>
  );
};

export default OtherData;

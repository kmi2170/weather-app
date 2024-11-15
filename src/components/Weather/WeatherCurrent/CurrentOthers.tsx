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

type CurrentOthersProps = {
  current: WeatherCurrent;
  units: Units;
};

const CurrentOthers = (props: CurrentOthersProps) => {
  const { current, units } = props;

  const { rain, snow, humidity, pressure, visibility, uvi } = current;

  // const totalPrecipitation = (rain?.["1h"] || 0) + (snow?.["1h"] || 0);
  const precipitation_rain = rain?.["1h"] || 0;
  const precipitation_snow = snow?.["1h"];

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
          Rain {precipitationWithUnit(precipitation_rain, units)}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "deepskyblue" }}>
          Humidity {humidity} %
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "maroon" }}>
          Pressure {pressureWithUnit(pressure, units)}
        </Typography>
      </DataWrapper>

      <DataWrapper>
        {precipitation_snow && (
          <Typography variant="subtitle1" sx={{ color: "dodgerblue" }}>
            Snow {precipitationWithUnit(precipitation_snow, units)}
          </Typography>
        )}
        <Typography variant="subtitle1" sx={{ color: "limegreen" }}>
          Visibility {visibilityWithUnit(visibility, units)}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "darkmagenta" }}>
          UV index {uvi}
        </Typography>
      </DataWrapper>
    </Paper>
  );
};

export default CurrentOthers;

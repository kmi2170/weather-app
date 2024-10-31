import Paper from "@mui/material/Paper";
import useWeatherMap from "../../hooks/useWeatherMap";

const WeatherMap = () => {
  const Map = useWeatherMap();

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "1.5rem",
        minHeight: { xs: "500px", sm: "600px", md: "650px" },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Map />
    </Paper>
  );
};

export default WeatherMap;

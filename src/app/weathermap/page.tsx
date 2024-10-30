import Paper from "@mui/material/Paper";
import useWeatherMap from "../../hooks/useWeatherMap";

const WeatherMap = () => {
  const Map = useWeatherMap();

  return (
    <Paper
      elevation={2}
      sx={{
        // width: "80vw",
        // height: "80vh",
        // width: "768px",
        // height: "768px",
        padding: "1.5rem",
        minHeight: "650px",
        // width: "512px",
        // width: "100%",
        // height: "600px",
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

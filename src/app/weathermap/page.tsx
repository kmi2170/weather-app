import useWeatherMap from "../../hooks/useWeatherMap";

const WeatherMap = () => {
  const Map = useWeatherMap();

  return (
    <div style={{}}>
      <Map />
    </div>
  );
};

export default WeatherMap;

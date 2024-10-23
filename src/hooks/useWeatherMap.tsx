import { useMemo } from "react";
import dynamic from "next/dynamic";
// import LoadingSpinner from '../components/Map/MapParts/LoadingSpinner';

const useWeatherMap = () => {
  return useMemo(
    () =>
      dynamic(() => import("../components/WeatherMap"), {
        loading: () => (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "66vh",
              background: "lightgray",
            }}
          >
            ... Loading Map
          </div>
        ),
        ssr: false,
      }),
    []
  );
};

export default useWeatherMap;

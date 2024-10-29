import { useMemo } from "react";
import dynamic from "next/dynamic";

const useWeatherMap = () => {
  return useMemo(
    () =>
      dynamic(() => import("../components/WeatherMap"), {
        loading: () => (
          <div
            style={{
              width: "100%",
              textAlign: "center",
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

import { useEffect, useRef, useState } from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { useAppSelector } from "../../store/hooks";
import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localDate, localDay, localTimeHour } from "../../utils/time";
import { Weather } from "../../api/types/weather";
import WeatherIcon from "./icons/WeatherIcon";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import WindIcon from "./icons/WindIcon";
import { isDay, precipitationWithUnit, tempWithUnit } from "../../utils/units";
import theme from "../../theme/theme";

const WeatherFortyEightHours = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  const { daily, hourly, timezone } = data as Weather;
  const sunAlmanac = daily.slice(0, 3).map((data) => {
    return [data.dt, data.sunrise, data.sunset];
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef) return;

      const scrollLeft = scrollRef.current?.scrollLeft;
      const scrollWidth = scrollRef.current?.scrollWidth;
      const clientWidth = scrollRef.current?.clientWidth;

      const scrollContentWidth = scrollWidth! - clientWidth!;

      if (scrollLeft === 0) {
        setShowLeftArrow(false);
      } else {
        setShowLeftArrow(true);
      }

      if (scrollLeft === scrollContentWidth) {
        setShowRightArrow(false);
      } else {
        setShowRightArrow(true);
      }
    };

    if (scrollRef?.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
      return () => {
        scrollRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const startScroll = (direction: "left" | "right") => {
    if (scrollRef?.current) {
      if (intervalRef?.current) clearInterval(intervalRef.current);

      const amount = direction === "left" ? -50 : 50;

      intervalRef.current = setInterval(() => {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
      }, 50);
    }
  };

  const stopScroll = () => {
    if (intervalRef?.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {showLeftArrow && (
        <IconButton
          title="arrow-left-scroll"
          aria-label="arrow-left-scroll"
          sx={{
            position: "absolute",
            top: "calc(50% - 4rem)",
            left: 0,
            zIndex: 10,
          }}
          onMouseDown={() => startScroll("left")}
          onTouchStart={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          onTouchEnd={stopScroll}
        >
          <ArrowCircleLeftIcon
            sx={(theme) => ({
              fontSize: { xs: "3rem", md: "4rem" },
              color: theme.palette.primary.dark,
              opacity: 0.7,
            })}
          />
        </IconButton>
      )}
      {showRightArrow && (
        <IconButton
          title="arrow-right-scroll"
          aria-label="arrow-right-scroll"
          sx={{
            position: "absolute",
            top: "calc(50% - 4rem)",
            right: 0,
            zIndex: 10,
          }}
          onMouseDown={() => startScroll("right")}
          onTouchStart={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          onTouchEnd={stopScroll}
        >
          <ArrowCircleRightIcon
            sx={(theme) => ({
              fontSize: { xs: "3rem", md: "4rem" },
              color: theme.palette.primary.dark,
              opacity: 0.7,
            })}
          />
        </IconButton>
      )}

      <Paper
        ref={scrollRef}
        sx={{
          position: "relative",
          padding: "1rem",
          paddingBottom: "1.5rem",
          width: "100%",
          overflowX: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "5px",
          }}
        >
          {hourly.map((data) => {
            const sunRiseSet = sunAlmanac.filter(
              (times) =>
                localDay(times[0], timezone) === localDay(data.dt, timezone)
            )[0];
            const [_, sunrise, sunset] = sunRiseSet;
            const _isDay = isDay(data.dt, sunrise, sunset);

            const totalPrecipitation =
              (data?.rain?.["1h"] || 0) + (data?.snow?.["1h"] || 0);

            const font_color = _isDay ? "black" : "white";
            const icon_color = _isDay
              ? theme.palette.primary.main
              : theme.palette.primary.light;

            return (
              <Box
                key={data.dt}
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px",
                  // borderBottom: "solid",
                  // borderBottomWidth: "5px",
                  // borderBottomColor: _isDay
                  //   ? "rgba(255, 165, 0,0.5)"
                  //   : "rgba(0,0,139,0.5)",
                  background: _isDay ? null : theme.palette.primary.dark,
                  borderRadius: "10px",
                  boxShadow: "6px 4px 6px rgba(0, 0, 0, 0.1)",
                })}
              >
                <Typography variant="subtitle2" align="center">
                  {localDay(data.dt, timezone)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  align="center"
                >
                  {localDate(data.dt, timezone)}
                </Typography>
                <WeatherIcon
                  sunset={sunset}
                  sunrise={sunrise}
                  time={data.dt}
                  weatherId={data.weather[0].id}
                  current
                  size="1.5rem"
                  iconColor={icon_color}
                />
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    width: "5rem",
                    marginBottom: "5px",
                    color: theme.palette.primary.main,
                  })}
                >
                  {tempWithUnit(data.temp, units)}
                </Typography>
                <WindIcon
                  wind_speed={data.wind_speed}
                  wind_deg={data.wind_deg}
                  wind_gust={data?.wind_gust}
                  current={false}
                  fontColor={font_color}
                  iconColor={icon_color}
                />
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{
                    marginTop: "8px",
                    marginBottom: "5px",
                    width: "5.0rem",
                  }}
                >
                  <Box
                    component="i"
                    sx={(theme) => ({ color: theme.palette.primary.main })}
                    className={`wi wi-umbrella`}
                  />{" "}
                  {data.pop != null ? (data.pop * 100).toFixed(0) : "-"}%
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{
                    marginTop: "8px",
                    marginBottom: "5px",
                    width: "5.0rem",
                  }}
                >
                  <Box
                    component="i"
                    sx={(theme) => ({ color: theme.palette.primary.main })}
                    className={`wi wi-raindrop`}
                  />{" "}
                  {precipitationWithUnit(totalPrecipitation, units)}
                </Typography>
                <Typography variant="h6" align="center">
                  {localTimeHour(data.dt, timezone)}
                </Typography>
              </Box>
            );
          })}
        </div>
      </Paper>
    </div>
  );
};

export default WeatherFortyEightHours;

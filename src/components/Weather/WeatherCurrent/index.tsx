import { memo } from "react";

import Grid from "@mui/material/Grid";

import { useAppSelector } from "../../../store/hooks";
import { useGetWeatherQuery } from "../../../services/weatherApi";

import { Weather } from "../../../api/types/weather";
import CurrentMain from "./CurrentMain";
import CurrentOthers from "./CurrentOthers";
import Almanac from "./Almanac";

const WeatherCurrent = () => {
  const { units, location, lang } = useAppSelector((state) => state.weather);

  const { lat, lon } = location;
  if (lat == null || lon == null) return;

  const { data } = useGetWeatherQuery({
    lat: lat.toString(),
    lon: lon.toString(),
    units,
    lang,
  });

  const { timezone, current, daily } = data as Weather;

  const { sunrise, sunset } = current;
  const { moonrise, moonset, moon_phase } = daily[0];

  return (
    <>
      <div>
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12} sm={7}>
            <CurrentMain
              current={current}
              location={location}
              units={units}
              timezone={timezone}
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            sm={5}
            flexDirection="column"
            justifyContent="space-between"
            alignItems="space-between"
            gap="0.75rem"
          >
            <CurrentOthers current={current} units={units} />
            <Almanac
              sunrise={sunrise}
              sunset={sunset}
              moonrise={moonrise}
              moonset={moonset}
              moon_phase={moon_phase}
              timezone={timezone}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default memo(WeatherCurrent);

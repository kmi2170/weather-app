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

  const { data } = useGetWeatherQuery({
    lat: String(lat),
    lon: String(lon),
    units,
    lang,
  });

  const { timezone, current, daily } = data as Weather;

  const { sunrise, sunset } = current;
  const { moonrise, moonset, moon_phase } = daily[0];

  return (
    <>
      <div>
        <Grid
          container
          justifyContent="space-between"
          alignItems="space-between"
        >
          <Grid xs={12} md={7}>
            <CurrentMain
              current={current}
              location={location}
              units={units}
              timezone={timezone}
            />
          </Grid>

          <Grid
            container
            xs={12}
            md={5}
            justifyContent="space-between"
            alignItems="space-between"
            gap="0.5rem"
            sx={{ pt: { xs: "0.5rem", md: 0 }, pl: { xs: 0, md: "0.75rem" } }}
          >
            <Grid xs={12}>
              <CurrentOthers current={current} units={units} />
            </Grid>
            <Grid xs={12}>
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
        </Grid>
      </div>
    </>
  );
};

export default WeatherCurrent;

import Grid from "@mui/material/Grid";

import { useAppSelector } from "../../../store/hooks";
import { useGetWeatherQuery } from "../../../services/weatherApi";

import { Weather } from "../../../api/types/weather";
import CurrentMain from "./CurrentMain";
import Details from "./Details";
import Almanac from "./Almanac";

const WeatherCurrent = () => {
  const { units, location, lang } = useAppSelector((state) => state.weather);

  const { lat, lon } = location;

  const { data } = useGetWeatherQuery(
    {
      lat: String(lat),
      lon: String(lon),
      units,
      lang,
    },
    { skip: !lat || !lon }
  );

  if (data == null) return;

  const { timezone, current, daily } = data as Weather;

  const { rain, snow, humidity, pressure, visibility, uvi, sunrise, sunset } =
    current;
  const { moonrise, moonset, moon_phase } = daily[0];

  const precipitation_rain = rain?.["1h"] || 0;
  const precipitation_snow = snow?.["1h"];

  return (
    <>
      <div>
        <Grid container>
          <Grid xs={12} sm={7}>
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
            sm={5}
            sx={{
              pt: { xs: "0.5rem", md: 0 },
              pl: { xs: 0, sm: "0.75rem" },
            }}
          >
            <Grid xs={12}>
              <Details
                rain={precipitation_rain}
                snow={precipitation_snow}
                pressure={pressure}
                humidity={humidity}
                visibility={visibility}
                uvi={uvi}
                units={units}
              />
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

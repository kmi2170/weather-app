import { memo } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../store/hooks";

import { selectWeather } from "../../slice/weatherSlice";
import { useGetWeatherQuery } from "../../services/weatherApi";
import { localFullDateTime } from "../../utils/time";
import { Weather } from "../../api/types/weather";
import { red } from "@mui/material/colors";

const Alerts = () => {
  const { units, lang, location } = useAppSelector(selectWeather);

  const { data, error } = useGetWeatherQuery({
    lat: String(location.lat),
    lon: String(location.lon),
    units,
    lang,
  });

  if (!(data as Weather)?.alerts) {
    return null;
  }

  const { alerts, timezone } = data as Weather;

  return (
    <>
      {alerts && (
        <>
          <Typography
            variant="h6"
            sx={(theme) => ({
              color: theme.palette.primary.dark,
            })}
          >
            Alerts
          </Typography>
          <Grid container spacing={2}>
            {alerts.map(
              ({ sender_name, start, end, description, tags }, i: number) => (
                <Grid key={i} item xs={12}>
                  <Paper
                    sx={{
                      padding: "1rem",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Sender: {sender_name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Tags:&nbsp;
                      {tags.map((tag: string, j: number) => (
                        <span key={j}>{tag},&nbsp;</span>
                      ))}
                    </Typography>
                    <Typography variant="subtitle2">
                      Start - {localFullDateTime(start, timezone)}
                    </Typography>
                    <Typography variant="subtitle2">
                      End - {localFullDateTime(end, timezone)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: red[900],
                        margin: "1rem 0",
                      }}
                    >
                      Description - {description}
                    </Typography>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default memo(Alerts);

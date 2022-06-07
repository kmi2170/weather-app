import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherQuery } from '../../services/weatherApi';
import { localFullDateTime } from '../../utils/time';

const useStyles = makeStyles(() => ({
  text: {},
  paper: {
    padding: '1rem',
  },
  description: {
    color: red[900],
    margin: '1rem 0',
  },
}));

const Alerts = () => {
  const classes = useStyles();

  const { units, lang, location } = useAppSelector(selectWeather);

  const { data: { alerts, timezone } } = useGetWeatherQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  return (
    <>
      {alerts && (
        <>
          <Typography variant="subtitle1" className={classes.text}>
            Alerts
          </Typography>
          <Grid container spacing={2}>
            {alerts.map(
              ({ sender_name, start, end, description, tags }, i: number) => (
                <Grid key={i} item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1" className={classes.text}>
                      Sender: {sender_name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      className={classes.text}
                    >
                      Tags:&nbsp;
                      {tags.map((tag: string, j: number) => (
                        <span key={j}>{tag},&nbsp;</span>
                      ))}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      Start - {localFullDateTime(start, timezone)}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      End - {localFullDateTime(end, timezone)}
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
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

export default Alerts;

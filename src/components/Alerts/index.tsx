import moment from 'moment-timezone';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import { useAppSelector } from '../../app/hooks';
import { selectWeather } from '../../features/weatherSlice';
import { useGetWeatherOnecallQuery } from '../../services/weatherOnecallApi';

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

  const { data: dataOnecall } = useGetWeatherOnecallQuery({
    lat: location.lat,
    lon: location.lon,
    units,
    lang,
  });

  const { alerts, timezone } = dataOnecall;

  const dateTimeLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format('MM/DD ddd h:mm a');
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
                      Start - {dateTimeLocalwithTZ(start, timezone)}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      End - {dateTimeLocalwithTZ(end, timezone)}
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

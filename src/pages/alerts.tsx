import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';

import moment from 'moment-timezone';

import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { WeatherContext, actionTypes } from '../reducer/reducer';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: '1rem',
  },
  description: {
    color: red[900],
    margin: '1rem 0',
  },
}));

const Alerts: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const { alerts, timezone } = state.weatherOnecall;

  const dateTimeLocalwithTZ = (dt: string, tzone: string) =>
    moment(new Date(+dt * 1000).toUTCString())
      .tz(tzone)
      .format('MM/DD ddd h:mm a');

  return (
    <Layout>
      <Grid container spacing={2}>
        {alerts.map(({ sender_name, start, end, description, tags }, i) => (
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
        ))}
      </Grid>
    </Layout>
  );
};

export default Alerts;
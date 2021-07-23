import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Loading...
      <CircularProgress />
    </div>
  );
};

export default Loading;

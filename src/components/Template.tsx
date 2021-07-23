import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const Component: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" className={classes.text}>
        component
      </Typography>
    </div>
  );
};

export default Component;

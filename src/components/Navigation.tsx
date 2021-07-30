import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';

import { Grid, Typography, List, ListItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { purple, red } from '@material-ui/core/colors';

import { WeatherContext, actionTypes } from '../reducer/reducer';

const useStyles = makeStyles((theme: Theme) => ({
  text: { color: '#000' },
  textSelected: {
    color: purple[500],
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {},
  listItemSelected: { borderBottom: `3px solid ${purple[500]}` },
}));

const list = [
  { id: 1, pathname: '/', name: 'Weather' },
  { id: 2, pathname: '/map', name: 'Map' },
  { id: 3, pathname: '/alerts', name: 'Alerts' },
];

const Navigation: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const handleClick = (id: number) => {
    console.log('id', id);

    dispatch({ type: actionTypes.SET_SELECTED_PAGE_ID, payload: id });
  };

  return (
    <nav>
      <List dense className={classes.list}>
        <Grid container justifyContent="space-around">
          {list.map(({ id, pathname, name }) => (
            <Grid key={id} item>
              <ListItem
                onClick={() => handleClick(id)}
                alignItems="center"
                className={
                  state.selectedPageId === id
                    ? `${classes.listItemSelected}`
                    : `${classes.listItem}`
                }
              >
                <Link href={{ pathname, query }} replace shallow>
                  <a>
                    <Typography
                      variant="h6"
                      align="center"
                      className={
                        state.selectedPageId === id
                          ? `${classes.textSelected}`
                          : `${classes.text}`
                      }
                    >
                      {name}
                    </Typography>
                  </a>
                </Link>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </nav>
  );
};

export default Navigation;

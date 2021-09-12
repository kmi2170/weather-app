import { useContext } from 'react';
import router, { useRouter } from 'next/router';

import { WeatherContext } from '../context';
import { actionTypes } from '../context/actionTypes';

import { Button, ButtonGroup, Tooltip } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  buttonSelected: {
    color: 'white',
    background: purple[500],
    borderColor: purple[500],
    '&:hover': {
      color: 'white',
      background: purple[500],
      borderColor: purple[500],
    },
  },
  buttonUnSelected: {
    color: purple[500],
    background: 'transparent',
    borderColor: purple[500],
    '&:hover': {
      color: 'white',
      background: purple[800],
      borderColor: purple[800],
    },
  },
}));

const Component: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const units = state.units === 'imperial' ? 'metric' : 'imperial';

    router.push({ pathname: '/', query: { ...query, units } });

    return dispatch({
      type: actionTypes.SET_UNITS,
      payload: units,
    });
  };

  const buttonProps = [
    { units: 'imperial', symbol: '℉' },
    { units: 'metric', symbol: '℃' },
  ];

  return (
    <>
      <Tooltip title="Switch Unit">
        <div className={classes.root}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            {buttonProps.map(({ units, symbol }) => (
              <Button
                key={units}
                variant={state.units === units ? 'contained' : 'outlined'}
                size="small"
                onClick={(e) => handleClick(e)}
                className={
                  state.units === units
                    ? classes.buttonSelected
                    : classes.buttonUnSelected
                }
              >
                {symbol}
              </Button>
            ))}

            {/* 
            <Button
              variant={state.units === 'imperial' ? 'contained' : 'outlined'}
              size="small"
              onClick={(e) => handleClick(e)}
              className={
                state.units === 'imperial'
                  ? classes.buttonSelected
                  : classes.buttonUnSelected
              }
            >
              ℉
            </Button>
            <Button
              variant={state.units !== 'imperial' ? 'contained' : 'outlined'}
              size="small"
              onClick={(e) => handleClick(e)}
              className={
                state.units !== 'imperial'
                  ? classes.buttonSelected
                  : classes.buttonUnSelected
              }
            >
              ℃
            </Button>
  */}
          </ButtonGroup>
        </div>
      </Tooltip>
    </>
  );
};

export default Component;

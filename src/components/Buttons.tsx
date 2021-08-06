import { useContext } from 'react';
import router, { useRouter } from 'next/router';

import { WeatherContext, actionTypes } from '../reducer/reducer';

import { Button, ButtonGroup, Tooltip } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
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

  const handleClickLang = () => {
    const lang = state.lang === 'en' ? 'ja' : 'en';

    router.push({ pathname: '/', query: { ...query, lang } });

    return dispatch({
      type: actionTypes.SET_LANG,
      payload: lang,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const units = state.units === 'imperial' ? 'metric' : 'imperial';

    router.push({ pathname: '/', query: { ...query, units } });

    return dispatch({
      type: actionTypes.SET_UNITS,
      payload: units,
    });
  };

  // const buttonLang = () =>
  //   state.lang === 'en' ? <span>Japanese</span> : <span>English</span>;

  // const buttonUnits = () =>
  //   state.units === 'imperial' ? <span>&#8457;</span> : <span>&#8451;</span>;

  // const buttonUnitsTooltip = () =>
  //   state.units !== 'imperial' ? (
  //     <span>Switch to &#8457;</span>
  //   ) : (
  //     <span>Switch to &#8451;</span>
  //   );

  // const buttonLangTooltip = () =>
  //   state.lang !== 'en' ? (
  //     <span>Switch to Japanese</span>
  //   ) : (
  //     <span>Switch to English</span>
  //   );

  return (
    <>
      <Tooltip title="Switch Unit">
        <div className={classes.root}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
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
          </ButtonGroup>
        </div>
      </Tooltip>
      {/* 
      <Tooltip title={buttonLangTooltip()}>
        <Button variant="outlined" size="small" onClick={handleClickLang}>
          {buttonLang()}
        </Button>
      </Tooltip>
      */}
    </>
  );
};

export default Component;

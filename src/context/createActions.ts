const createActions = (dispatch) => ({
  up: () => dispatch({ type: 'up' }),
  down: () => dispatch({ type: 'down' }),
  reset: () => dispatch({ type: 'reset' }),
});

export default createActions;

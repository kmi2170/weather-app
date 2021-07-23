import { createTheme } from '@material-ui/core/styles';
import { responsiveFontSizes } from '@material-ui/core/styles';

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { red } from '@material-ui/core/colors';

const breakpoints = createBreakpoints({});

// breakpoints.values.lg = 1024
// breakpoints.values['xxl'] = 3000
// '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Lobster',
      'Raleway',
      'sans-serif',
      // 'Roboto Condensed',
      'Rubik',
      'Oswald',
      'Viaoda Libre',
    ].join(','),
    // h4: {
    //   fontSize: '2.125rem',
    //   [breakpoints.down('sm')]: {
    //     fontSize: '1.5rem',
    //   },
    // },
  },
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;

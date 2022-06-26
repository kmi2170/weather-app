import { createTheme } from '@material-ui/core/styles';
import { responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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
      'Overlock',
      'Roboto',
      'Lobster',
      'Raleway',
      'sans-serif',
      // 'Roboto Condensed',
      'Rubik',
      'Oswald',
      'Viaoda Libre',
    ].join(','),
  },
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;

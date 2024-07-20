import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Overlock",
      "Roboto",
      "Lobster",
      "Raleway",
      "sans-serif",
      // 'Roboto Condensed',
      "Rubik",
      "Oswald",
      "Viaoda Libre",
    ].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;

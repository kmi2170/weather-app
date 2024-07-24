import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";
import { Overlock } from "next/font/google";

export const overlock = Overlock({
  subsets: ["latin"],
  style: "normal",
  weight: ["400"],
  display: "swap",
});

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      light: "rgb(233, 213, 255)",
      main: purple[500],
    },
    background: {
      default: "rgb(233, 213, 255)",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: overlock.style.fontFamily,
  },
});

theme = responsiveFontSizes(theme);

export default theme;

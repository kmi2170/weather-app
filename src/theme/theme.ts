import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";
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
    fontFamily: overlock.style.fontFamily,
    // fontFamily: [
    //   "Overlock",
    //   "sans-serif",
    //   // 'Roboto Condensed',
    // ].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;

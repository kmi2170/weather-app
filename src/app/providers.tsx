"use client";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import { store } from "../store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <CookiesProvider>{children}</CookiesProvider>
        </Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

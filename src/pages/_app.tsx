import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";

import SEO from "../components/SEO";
import { store } from "../app/store";
import * as gtag from "../lib/gtag";

import theme from "../theme/theme";
import "../styles/globals.css";
import "../styles/weathericons/css/weather-icons.min.css";
import "../styles/weathericons/css/weather-icons-wind.min.css";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles != null && jssStyles.parentElement != null) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     gtag.pageview(url);
  //     console.log("ga: url", url);
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Weather App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <SEO />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </Provider>
      </ThemeProvider>
    </AppCacheProvider>
  );
};

export default MyApp;
// <StyledEngineProvider injectFirst>
// </StyledEngineProvider>

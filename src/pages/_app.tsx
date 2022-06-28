import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SEO from '../components/SEO';
import { setupStore } from '../app/store';
import * as gtag from '../lib/gtag';

import theme from '../theme/theme';
import '../styles/globals.css';
import '../styles/weathericons/css/weather-icons.min.css';
import '../styles/weathericons/css/weather-icons-wind.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      console.log('ga: url', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Weather App</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <SEO />
        </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={setupStore()}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default MyApp;

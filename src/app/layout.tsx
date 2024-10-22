import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "../theme/theme";
import StoreProvider from "./providers";

import "../styles/globals.css";
import "../styles/weathericons/css/weather-icons.min.css";
import "../styles/weathericons/css/weather-icons-wind.min.css";

export const metadata: Metadata = {
  title: "My Weather Station",
  description:
    "Weather information app. Next.js project with TypeScript, Material-UI, Redux-Toolkit(RTK), RTK Query. Powered by OpenWeatherAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

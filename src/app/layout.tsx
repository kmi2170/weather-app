import { Metadata } from "next";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import { store } from "../store/store";
import Providers from "./providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <AppRouterCacheProvider>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Provider store={store}>
//               <CookiesProvider>{children}</CookiesProvider>
//             </Provider>
//           </ThemeProvider>
//         </AppRouterCacheProvider>
//       </body>
//     </html>
//   );
// }

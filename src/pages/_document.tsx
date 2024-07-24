import React from "react";
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheets as JSSServerStyleSheets } from "@mui/styles";
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v14-pagesRouter";

import theme, { overlock } from "../theme/theme";

// import { GA_TRACKING_ID } from "../lib/gtag";
import { AppProps } from "next/app";

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  // export default class MyDocument extends Document {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <Html lang="en" className={overlock.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <DocumentHeadTags {...props} />

        {/* We only want to add the scripts if in production */}
        {isProduction && (
          <>
            {/* Global Site Tag (gtag.js) - Google Analytics
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${
                GA_TRACKING_ID as string
              }`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID as string}', {
                      page_path: window.location.pathname,
                    });
                  `,
              }}
            /> */}
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
let prefixer: any;
let cleanCSS: any;
if (process.env.NODE_ENV === "production") {
  /* eslint-disable global-require */
  const postcss = require("postcss");
  const autoprefixer = require("autoprefixer");
  const CleanCSS = require("clean-css");
  /* eslint-enable global-require */

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const jssSheets = new JSSServerStyleSheets();

  const finalProps = await documentGetInitialProps(ctx, {
    plugins: [
      {
        enhanceApp: (App: React.ComponentType<AppProps>) =>
          function EnhanceApp(props: AppProps) {
            return jssSheets.collect(<App {...props} />);
          },
        resolveProps: async (initialProps: DocumentInitialProps) => {
          // Generate the css string for the styles coming from jss
          let css = jssSheets.toString();
          // It might be undefined, for example after an error.
          if (css && process.env.NODE_ENV === "production") {
            const result1 = await prefixer.process(css, { from: undefined });
            css = result1.css;
            css = cleanCSS.minify(css).styles;
          }

          return {
            ...initialProps,
            styles: [
              ...(Array.isArray(initialProps.styles)
                ? initialProps.styles
                : [initialProps.styles]),
              <style
                id="jss-server-side"
                key="jss-server-side"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: css }}
              />,
              ...React.Children.toArray(initialProps.styles),
            ],
          };
        },
      },
    ],
  });

  return finalProps;
};

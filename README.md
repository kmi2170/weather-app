# News Picker

An app to fetch news from Free News API 
([Rapid API](https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/free-news/),
[Docs](https://free-docs.newscatcherapi.com/#introduction))

## Features
- Catch news from various souces with Free News API
- Search news by keywords, sources and date (up to a month old).
- Language: English / Japanese
- Register kewords as favorites and call them back later
(cookie must be enabled).

## Technicals
### This Project
It is built with [Next.js](https://nextjs.org/), TypeScript, [Redux-Toolkit](https://redux-toolkit.js.org/) and [Material-UI](https://mui.com/).
Also, [Redux-Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) is used for fetching and state management of news data.

### Authentication
You need to create a [Rapid API](https://rapidapi.com/) account and get an API KEY for [Basic Plan](https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/free-news/pricing) (free for non-commercial use).
See this [Link](https://free-docs.newscatcherapi.com/#authentication) for details.
You can also apply for 
[Contributor Plan](https://free-docs.newscatcherapi.com/#contributors)
that gives more access to the Free News API.

Create .env.local file in the root folder and define the key there as enviromental variables to protect it.

```bash
// .env.local file
NEXT_PUBLIC_RAPID_API_KEY='<YOUR API KEY>'
NEXT_PUBLIC_RAPID_API_HOST=free-news.p.rapidapi.com
```

If you want to use [Google Analysis](https://analytics.google.com/), store the Ttracking ID in .env.local file as well.

```bash
GA_TRACKING_ID=xxxxxxxx
```

### API End Points
- [Docs 1](https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/free-news/)
- [Docs 2](https://free-docs.newscatcherapi.com/#api-specs)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

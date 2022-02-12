# My Weather Station

An app to display weather information, fetched from [OpenWeather API](https://openweathermap.org/api).

## Features

- By default, look up your location by the IP address and display the weather information
  - Current
  - 1 hour precipitation predicton
  - 1 hour predictions for 48 hours
  - 7 days forecast
  - Alerts (when issued)
- Switch between imperial and metric units.
- Search locations around the world.
- If cookie is enabled, last displayed location and selected units are saved and retrieved when you launch the app next time.

## Technicals

This project is built with [Next.js](https://nextjs.org/), TypeScript, [Redux-Toolkit](https://redux-toolkit.js.org/) and [Material-UI](https://mui.com/).
Also, [Redux-Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) is used for fetching and state management of weather data.

You need to apply and get [API ID key](https://openweathermap.org/appid) to make this app work (there is a free plan).

Create .env.local file in the root folder and define the key there as an enviromental variable to protect it.

```bash
// .env.local file
NEXT_PUBLIC_WEATHER_API_KEY=xxxxxxx
```

If you want to use [Google Analysis](https://analytics.google.com/), store the Ttracking ID in .env.local file as well.

```bash
GA_TRACKING_ID=xxxxxxxx
```

### API Calls (JSON)

- Look up your location from IP address:
  [ipapi](https://ipapi.co)
- Weather data:
  [One call](https://openweathermap.org/api/one-call-api#how)
- Search locatons
  [Geocoding API](https://openweathermap.org/api/geocoding-api)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

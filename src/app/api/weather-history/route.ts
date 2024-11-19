import { NextResponse } from "next/server";
import { WeatherHistoryQuery } from "../../../api/types/weather";
import { fetchWeatherHistory } from "../../../api/lib/fetchWeatherHistory";

export async function GET(req: Request) {
  try {
    const url = new URL(req?.url as string);
    const searchParams = url.searchParams;
    const query = {
      lat: searchParams.get("lat"),
      lon: searchParams.get("lon"),
      date: searchParams.get("date"),
      tz: searchParams.get("date"),
      units: searchParams.get("units"),
      lang: searchParams.get("lang"),
    } as WeatherHistoryQuery;

    const data_history = await fetchWeatherHistory(query);
    return NextResponse.json(data_history, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

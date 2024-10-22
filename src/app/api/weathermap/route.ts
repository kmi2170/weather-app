import { NextResponse } from "next/server";
import { fetchWeatherMap } from "../../../api/lib/fetchWeatherMap";
import { WeatherQuery } from "../../../api/types";

export async function GET(req: Request) {
  try {
    const url = new URL(req?.url as string);
    const searchParams = url.searchParams;
    const query = {
      // lat: searchParams.get("lat"),
      // lon: searchParams.get("lon"),
      lat: "47",
      lon: "-122",
      // units: searchParams.get("units"),
      // lang: searchParams.get("lang"),
    } as WeatherQuery;

    const data = await fetchWeatherMap(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

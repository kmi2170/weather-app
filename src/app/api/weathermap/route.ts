import { NextResponse } from "next/server";
import { fetchWeatherMap } from "../../../api/lib/fetchWeatherMap";
import { WeatherMapQuery } from "../../../api/types/weatherMap";

export async function GET(req: Request) {
  try {
    const url = new URL(req?.url as string);
    const searchParams = url.searchParams;
    const query = {
      lat: searchParams.get("lat"),
      lon: searchParams.get("lon"),
      zoom: searchParams.get("zoom"),
      layer: searchParams.get("layer"),
    } as WeatherMapQuery;

    const data = await fetchWeatherMap(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

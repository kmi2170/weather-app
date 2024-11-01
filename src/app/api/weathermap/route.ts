import { NextResponse } from "next/server";
import { fetchWeatherMap } from "../../../api/lib/fetchWeatherMap";
import { WeatherMapLayerKeys, WeatherMapQuery } from "../../../api/types/map";

import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("__vercel_live_token");

    const url = new URL(req?.url as string);
    const searchParams = url.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const zoom = searchParams.get("zoom");
    const layer = searchParams.get("layer");

    if (lat == null || lon == null || zoom == null || layer == null) {
      throw new Error("not sufficient parameters");
    }

    const query: WeatherMapQuery = {
      lat: Number(lat),
      lon: Number(lon),
      zoom: Number(zoom),
      layer: layer as WeatherMapLayerKeys,
    };

    const data = await fetchWeatherMap(query);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

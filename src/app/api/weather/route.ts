import { NextApiRequest } from "next";
import { fetchWeather } from "../../../api/lib/fetchWeather";
import { WeatherQuery } from "../../../api/types";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const url = new URL(req?.url as string);
    const searchParams = url.searchParams;
    const query = {
      lat: searchParams.get("lat"),
      lon: searchParams.get("lon"),
      units: searchParams.get("units"),
      lang: searchParams.get("lang"),
    } as WeatherQuery;

    const data = await fetchWeather(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

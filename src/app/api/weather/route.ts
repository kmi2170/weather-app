import { NextResponse } from "next/server";
import { fetchWeather } from "../../../api/lib/fetchWeather";
import { WeatherQuery } from "../../../api/types/weather";

export async function GET(req: Request) {
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
    return NextResponse.json(data, {
      status: 200,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET ",
      //   "Access-Control-Allow-Headers": "Content-Type",
      // },
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET ",
      //   "Access-Control-Allow-Headers": "Content-Type",
      // },
    });
  }
}

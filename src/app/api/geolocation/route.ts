import { NextResponse } from "next/server";
import { fetchGeocodingByLocationName } from "../../../api/lib";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url as string);
    const searchParams = url.searchParams;
    const query = searchParams.get("q") as string;

    const data = await fetchGeocodingByLocationName(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

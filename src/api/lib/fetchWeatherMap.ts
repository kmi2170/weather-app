import axios from "axios";
import {
  BoundsType,
  WeatherMapLayerKeys,
  WeatherMapQuery,
  WeatherMapResponse,
} from "../types/map";
import { CustomResponse } from "../types";

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_KEY;

const TILE_SIZE = 256;

export const fetchWeatherMap = async ({
  lat,
  lon,
  zoom,
  layer,
}: WeatherMapQuery): Promise<CustomResponse<WeatherMapResponse>[] | string> => {
  try {
    const numOfDivision = Math.pow(2, zoom);

    const asyncFunctionsArray = Array.from(
      { length: numOfDivision },
      (_: unknown, iLat: number) =>
        Array.from({ length: numOfDivision }, (_: unknown, iLon: number) => {
          const params = {
            tileX: iLat,
            tileY: iLon,
            zoom,
            layer,
            appid: appid!,
          };

          return createAsyncFunction(params);
        })
    );

    const results = await Promise.all(
      asyncFunctionsArray.map(async (row) => {
        return await Promise.all(row.map((func) => func()));
      })
    );

    const flattenedResults = results.flat();

    const errorExists = flattenedResults.some((data) =>
      data.hasOwnProperty("error")
    );

    if (errorExists) {
      throw new Error("failed to fetch image data");
    }

    return flattenedResults;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

type CreateAsyncFunctionParams = {
  tileX: number;
  tileY: number;
  zoom: number;
  layer: WeatherMapLayerKeys;
  appid: string;
};

function createAsyncFunction(
  params: CreateAsyncFunctionParams
): () => Promise<CustomResponse<WeatherMapResponse>> {
  return async () => {
    try {
      const { tileX, tileY, zoom, layer, appid } = params;

      const url = createUrl({ layer, zoom, tileX, tileY });

      const { data } = await axios.get(url, {
        params: { appid },
        responseType: "arraybuffer",
      });

      const bounds = calculateBounds({ zoom, tileX, tileY });

      const rtnData: WeatherMapResponse = {
        bounds,
        img: binaryToBase64Image(data),
        tileCoords: [tileX, tileY],
      };

      return { success: rtnData };
    } catch (error) {
      return { error: error.message };
    }
  };
}

type CreateUrlParams = {
  layer: WeatherMapLayerKeys;
  zoom: number;
  tileX: number;
  tileY: number;
};

function createUrl(params: CreateUrlParams) {
  const { layer, zoom, tileX: tileX, tileY: tileY } = params;

  return `https://tile.openweathermap.org/map/${layer}/${zoom}/${tileX}/${tileY}.png`;
}

const binaryToBase64Image = (data) => {
  const base64Image = Buffer.from(data, "binary").toString("base64");

  return "data:image/png;base64," + base64Image;
};

type CalculateBoundsParams = {
  zoom: number;
  tileX: number;
  tileY: number;
};

function calculateBounds(params: CalculateBoundsParams): BoundsType {
  const { zoom, tileX, tileY } = params;

  const bounds = [
    pixelToLatLng({
      pixelX: tileX * TILE_SIZE,
      pixelY: tileY * TILE_SIZE,
      zoom,
    }),
    pixelToLatLng({
      pixelX: (tileX + 1) * TILE_SIZE,
      pixelY: (tileY + 1) * TILE_SIZE,
      zoom,
    }),
  ] as BoundsType;

  return bounds;
}

type PixelToLatLngParams = {
  pixelX: number;
  pixelY: number;
  zoom: number;
};

function pixelToLatLng(params: PixelToLatLngParams): [number, number] {
  const { pixelX, pixelY, zoom } = params;

  const L = 85;

  const lon = 180 * (pixelX / Math.pow(2, zoom + 7) - 1);
  const lat =
    (180 / Math.PI) *
    Math.asin(
      Math.tanh(
        -(Math.PI / Math.pow(2, zoom + 7)) * pixelY +
          Math.atanh(Math.sin((Math.PI / 180) * L))
      )
    );
  return [lat, lon];
}

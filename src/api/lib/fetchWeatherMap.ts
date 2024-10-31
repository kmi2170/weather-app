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

    const [pixelX, pixelY] = latLngToPixel({ lat, lng: lon, zoom });

    const tileX_center = Math.floor(pixelX / TILE_SIZE);
    const tileY_center = Math.floor(pixelY / TILE_SIZE);

    // const asyncFunctionsArray = Array.from(
    //   { length: numOfDivision },
    //   (_: unknown, iLat: number) =>
    //     Array.from({ length: numOfDivision }, (_: unknown, iLon: number) => {
    //       const params = {
    //         tileX: iLat,
    //         tileY: iLon,
    //         zoom,
    //         layer,
    //         appid: appid!,
    //       };

    //       return createAsyncFunction(params);
    //     })
    // );

    const asyncFunctionsArray: CreateAsyncFunctionResponse[] = [];

    const subTileX_center = Math.floor(
      (pixelX - tileX_center * TILE_SIZE) / (TILE_SIZE * 0.5)
    );
    const subTileY_center = Math.floor(
      (pixelY - tileY_center * TILE_SIZE) / (TILE_SIZE * 0.5)
    );

    const dyL = 0;
    const dyR = 0;
    // const dyL = subTileY_center === 0 ? 1 : 0;
    // const dyR = subTileY_center === 1 ? 1 : 0;
    const dxL = subTileX_center === 0 ? 1 : 0;
    const dxR = subTileX_center === 1 ? 1 : 0;

    const num = 1;

    for (
      let iLat = tileY_center - num - dyL;
      iLat <= tileY_center + num + dyR;
      iLat++
    ) {
      for (
        let iLon = tileX_center - num - dxL;
        iLon <= tileX_center + num + dxR;
        iLon++
      ) {
        if (
          iLat < 0 ||
          iLon < 0 ||
          iLat >= numOfDivision ||
          iLon >= numOfDivision
        ) {
          continue;
        }

        const params = {
          tileX: iLon,
          tileY: iLat,
          zoom,
          layer,
          appid: appid!,
        };

        asyncFunctionsArray.push(createAsyncFunction(params));
      }
    }

    const results = await Promise.all(
      asyncFunctionsArray.map((func) => func())
    );

    const errorExists = results.some((data) => data.hasOwnProperty("error"));

    if (errorExists) {
      throw new Error("failed to fetch image data");
    }

    return results;
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

type CreateAsyncFunctionResponse = () => Promise<
  CustomResponse<WeatherMapResponse>
>;

function createAsyncFunction(
  params: CreateAsyncFunctionParams
): CreateAsyncFunctionResponse {
  return async () => {
    try {
      const { tileX, tileY, zoom, layer, appid } = params;

      const url = createUrl({ layer, zoom, tileX, tileY });

      const { data } = await axios.get(url, {
        params: { appid },
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "image/png",
        },
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

type LatLngToPixelParams = {
  lat: number;
  lng: number;
  zoom: number;
  L?: number;
};

function latLngToPixel(params: LatLngToPixelParams): [number, number] {
  const { lat, lng, zoom, L = 85.05112878 } = params;

  const pixelX = Math.pow(2, zoom + 7) * (lng / 180 + 1);
  const pixelY =
    (Math.pow(2, zoom + 7) / Math.PI) *
    (-Math.atanh(Math.sin((Math.PI / 180) * lat)) +
      Math.atanh(Math.sin((Math.PI / 180) * L)));

  return [pixelX, pixelY];
}

type PixelToLatLngParams = {
  pixelX: number;
  pixelY: number;
  zoom: number;
  L?: number;
};

function pixelToLatLng(params: PixelToLatLngParams): [number, number] {
  const { pixelX, pixelY, zoom, L = 85.05112878 } = params;

  const lng = 180 * (pixelX / Math.pow(2, zoom + 7) - 1);
  const lat =
    (180 / Math.PI) *
    Math.asin(
      Math.tanh(
        -(Math.PI / Math.pow(2, zoom + 7)) * pixelY +
          Math.atanh(Math.sin((Math.PI / 180) * L))
      )
    );
  return [lat, lng];
}

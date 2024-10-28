"use client";

import { SetStateAction, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useGetWeatherMapQuery } from "../../services/weatherApi";
import { useAppSelector } from "../../store/hooks";
import {
  layers,
  WeatherMapLayerKeys,
  WeatherMapLayerNames,
  WeatherMapResponse,
} from "../../api/types/map";
import Legends from "./Legends";

// const lat = 46.94195;
// const lon = -122.60632;
const initZoom = 6;
const minZoom = 4;

// const latLngBounds = [
//   [-90, -180],
//   [90, 180],
// ] as LatLngBoundsExpression;

const Map = () => {
  const { location } = useAppSelector((state) => state.weather);

  const mapRef = useRef(null);

  const [zoom, setZoom] = useState(minZoom);
  const [layer, setLayer] = useState<WeatherMapLayerKeys>("temp_new");

  console.log(zoom);

  const lat = location.lat!;
  const lon = location.lon!;

  // if (lat == null && lon == null) return null;

  const { data, isLoading, isError } = useGetWeatherMapQuery({
    lat,
    lon,
    zoom,
    layer,
  });

  const handleSelectLayer = (id: WeatherMapLayerKeys) => {
    setLayer(id);
  };

  if (isLoading || !data) return null;

  return (
    <Grid container flexDirection="column">
      <Grid item container flexDirection={{ xs: "column", md: "row" }}>
        <Grid item>
          <MapContainer
            ref={mapRef}
            style={{
              width: "768px",
              height: "512px",
              padding: 0,
              margin: 0,
            }}
            center={[lat, lon]}
            zoom={initZoom}
            // dragging={false}
            scrollWheelZoom={false}
            // maxBounds={latLngBounds}
            minZoom={minZoom}
            maxZoom={10}
            // @ts-ignore
            whenReady={(e) => {
              // e.target.fitBounds(bounds);
            }}
            // Have the map adjust its view to the same bounds as the Image Overlay
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomLevel setZoom={setZoom} center={[lat, lon]} />

            {data.map((tile) => {
              const { success } = tile;
              const { bounds, img, tileCoords } = success as WeatherMapResponse;

              // const [x, y] = tileCoords;

              return (
                <ImageOverlay
                  key={JSON.stringify(bounds)}
                  url={img}
                  bounds={bounds as LatLngBoundsExpression}
                  opacity={1}
                />
              );
            })}
          </MapContainer>
        </Grid>

        <Grid item>
          <LayerSelectButtons handleClick={handleSelectLayer} />
        </Grid>
      </Grid>

      <Grid xs={12} item sx={{ marginTop: "1rem" }}>
        <Legends layer={layer} />
      </Grid>
    </Grid>
  );
};

export default Map;

type LayerSelectButtonsProps = {
  handleClick: (id: WeatherMapLayerKeys) => void;
};

const LayerSelectButtons = (props: LayerSelectButtonsProps) => {
  const { handleClick } = props;
  return (
    <Grid
      container
      flexDirection={{ xs: "row", md: "column" }}
      justifyContent="center"
      alignContent="center"
      flexWrap="wrap"
      gap="0.5rem"
      sx={{
        marginTop: "2rem",
        padding: "1rem",
      }}
    >
      {layers.map((layer) => {
        return (
          <Button
            id={layer.id}
            variant="outlined"
            onClick={() => handleClick(layer.id)}
          >
            {layer.name}
          </Button>
        );
      })}
    </Grid>
  );
};

type ZoomLevelProps = {
  setZoom: React.Dispatch<SetStateAction<number>>;
  center: [number, number];
};

const ZoomLevel = (props: ZoomLevelProps) => {
  const { setZoom, center } = props;

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
      mapEvents.setView(center, mapEvents.getZoom(), { animate: true });
    },
  });

  return null;
};

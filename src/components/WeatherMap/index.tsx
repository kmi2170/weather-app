"use client";

import { SetStateAction, useRef, useState } from "react";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { LatLngBoundsExpression, LeafletEvent, map } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useGetWeatherMapQuery } from "../../services/weatherApi";
import { useAppSelector } from "../../store/hooks";
import {
  layers,
  WeatherMapLayerKeys,
  WeatherMapLayerNames,
  WeatherMapResponse,
} from "../../api/types/map";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { Dispatch } from "@reduxjs/toolkit";
import { init } from "next/dist/compiled/webpack/webpack";

const lat = 47;
const lon = -122;
const initZoom = 1;

const Map = () => {
  const { location } = useAppSelector((state) => state.weather);

  const mapRef = useRef(null);

  const [zoom, setZoom] = useState(initZoom);
  const [layer, setLayer] = useState<WeatherMapLayerKeys>("temp_new");

  console.log(zoom);

  const { data, isLoading, isError } = useGetWeatherMapQuery({
    lat,
    lon,
    zoom,
    layer,
  });

  const latLngBounds = [
    [-90, -180],
    [90, 180],
  ] as LatLngBoundsExpression;

  const handleSelectLayer = (id: WeatherMapLayerKeys) => {
    setLayer(id);
  };

  if (isLoading || !data) return null;

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          width: "80vw",
          height: "80vh",
          margin: "5rem auto 0 auto",
        }}
      >
        <MapContainer
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            padding: 0,
            margin: 0,
          }}
          center={[47, -122]}
          zoom={initZoom}
          scrollWheelZoom={true}
          maxBounds={latLngBounds}
          // @ts-ignore
          // whenReady={(e) => {
          //   e.target.fitBounds(bounds);
          // }}
          // Have the map adjust its view to the same bounds as the Image Overlay
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomLevel setZoom={setZoom} />

          {data.map((tile) => {
            const { success } = tile;
            const { bounds, img, tileCoords } = success as WeatherMapResponse;

            return (
              <ImageOverlay
                key={JSON.stringify(bounds)}
                url={img}
                bounds={bounds as LatLngBoundsExpression}
                opacity={0.99}
              />
            );
          })}
        </MapContainer>
      </Paper>

      <LayerSelectButtons handleClick={handleSelectLayer} />
    </>
  );
};

export default Map;

type LayerSelectButtonsProps = {
  handleClick: (id: WeatherMapLayerKeys) => void;
};

const LayerSelectButtons = (props: LayerSelectButtonsProps) => {
  const { handleClick } = props;
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
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
    </div>
  );
};

type ZoomLevelProps = {
  setZoom: React.Dispatch<SetStateAction<number>>;
};

const ZoomLevel = (props: ZoomLevelProps) => {
  const { setZoom } = props;

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
    },
  });

  return null;
};

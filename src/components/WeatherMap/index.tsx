"use client";

import { useRef, useState } from "react";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import { LatLngBoundsExpression, LeafletEvent, map } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useGetWeatherMapQuery } from "../../services/weatherApi";
import { useAppSelector } from "../../store/hooks";
import {
  layers,
  WeatherMapLayerIds,
  WeatherMapLayerNames,
} from "../../api/types/weatherMap";

const Map = () => {
  const { location } = useAppSelector((state) => state.weather);

  const mapRef = useRef(null);

  const [zoom, setZoom] = useState(1);
  const [layer, setLayer] = useState<WeatherMapLayerIds>("temp_new");
  const [tiles, setTiles] = useState(
    Array(zoom + 1).fill(Array(zoom + 1).fill(null))
  );
  console.log(tiles);

  const { data, isLoading, isError } = useGetWeatherMapQuery({
    x: String(0),
    y: String(0),
    zoom: String(0),
    layer,
  });

  const latLngBounds = [
    [-90, -180],
    [90, 180],
  ] as LatLngBoundsExpression;

  const bounds = latLngBounds;

  const handleSelectLayer = (id: WeatherMapLayerIds) => {
    setLayer(id);
  };

  if (isLoading || !data) return null;

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          // position: "relative",
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
          center={[-100, 100]}
          zoom={zoom}
          scrollWheelZoom={true}
          maxBounds={latLngBounds}
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

          <ImageOverlay url={data} bounds={latLngBounds} opacity={0.99} />
        </MapContainer>
      </Paper>

      <LayerSelectButtons handleClick={handleSelectLayer} />
    </>
  );
};

export default Map;

type LayerSelectButtonsProps = {
  handleClick: (id: WeatherMapLayerIds) => void;
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

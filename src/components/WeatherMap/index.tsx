"use client";

import { useState } from "react";

import Paper from "@mui/material/Paper";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useGetWeatherMapQuery } from "../../services/weatherApi";
import { useAppSelector } from "../../store/hooks";
import { WeatherMapLayer } from "../../api/types/weatherMap";

const lat = 47;
const lon = -122;

const Map = () => {
  const { location } = useAppSelector((state) => state.weather);

  const [zoom, setZoom] = useState(1);
  const [layer, setLayer] = useState<WeatherMapLayer>("temp_new");

  const { data, isLoading, isError } = useGetWeatherMapQuery({
    lat: String(lat),
    lon: String(lon),
    zoom: String(zoom),
    layer,
  });

  const latLngBounds = [
    [-90, -180],
    [90, 180],
  ] as LatLngBoundsExpression;

  if (isLoading || !data) return null;

  return (
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
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          margin: 0,
        }}
        center={[lat, lon]}
        zoom={1}
        scrollWheelZoom={false}
        maxBounds={latLngBounds}
        // whenReady={(e) => e.target.fitBounds(bounds)} // Have the map adjust its view to the same bounds as the Image Overlay
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ImageOverlay url={data} bounds={latLngBounds} opacity={0.7} />
      </MapContainer>
      {/* <Image
        src={url}
        width={300}
        height={300}
        // layout="fill"
        objectFit="contain"
        alt="test"
      /> */}
    </Paper>
  );
};

export default Map;

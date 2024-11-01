"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  ImageOverlay,
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useGetWeatherMapQuery } from "../../services/weatherApi";
import { useAppSelector } from "../../store/hooks";
import {
  layers,
  WeatherMapLayerKeys,
  WeatherMapResponse,
} from "../../api/types/map";
import Legends from "./Legends";

const initZoom = 6;
const minZoom = 4;

// const latLngBounds = [
//   [-90, -180],
//   [90, 180],
// ] as LatLngBoundsExpression;

const markerIcon = new L.Icon({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

const Map = () => {
  const { location } = useAppSelector((state) => state.weather);

  const mapRef = useRef<L.Map | null>(null);

  const [zoom, setZoom] = useState(minZoom);
  const [layer, setLayer] = useState<WeatherMapLayerKeys>("temp_new");

  const lat = location.lat!;
  const lon = location.lon!;

  const { data, isLoading, isError } = useGetWeatherMapQuery({
    lat,
    lon,
    zoom,
    layer,
  });

  const handleSelectLayer = (
    id: WeatherMapLayerKeys,
    layer: WeatherMapLayerKeys
  ) => {
    if (id !== layer) {
      setLayer(id);
    }
  };

  useEffect(() => {
    const moveToTargetLocation = () => {
      if (mapRef !== null) {
        mapRef?.current?.flyTo({ lat, lng: lon }, initZoom, { duration: 2 });
      }
    };

    moveToTargetLocation();
  }, [lat, lon]);

  return (
    <Grid container flexDirection="column">
      <Grid
        item
        container
        flexDirection={{ xs: "column" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          sx={{
            width: { xs: "330px", sm: "512px", md: "650px", lg: "768px" },
            height: { xs: "256px", sm: "384px", md: "512px", lg: "512px" },
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
            center={[lat, lon]}
            zoom={initZoom}
            dragging={false}
            scrollWheelZoom={false}
            // maxBounds={latLngBounds}
            minZoom={minZoom}
            maxZoom={11}
            // @ts-ignore
            // whenReady={(e) => {
            // e.target.fitBounds(bounds);
            // }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomLevel setZoom={setZoom} center={[lat, lon]} />

            {!isLoading &&
              !isError &&
              Array.isArray(data) &&
              data.map((tile) => {
                if (tile?.error) return null;

                const { success } = tile;
                const { bounds, img, tileCoords } =
                  success as WeatherMapResponse;
                // const [x, y] = tileCoords;

                return (
                  <ImageOverlay
                    key={String(tileCoords[0]) + String(tileCoords[1])}
                    url={img}
                    bounds={bounds as LatLngBoundsExpression}
                    opacity={1}
                  />
                );
              })}

            <Marker position={{ lat, lng: lon }} />
          </MapContainer>
        </Grid>

        <Grid xs={12} item>
          <Box sx={{ height: "2rem", marginTop: "1rem" }}>
            <Legends layer={layer} />
          </Box>
        </Grid>

        <Grid item>
          <LayerSelectButtons layer={layer} handleClick={handleSelectLayer} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Map;

type LayerSelectButtonsProps = {
  layer: WeatherMapLayerKeys;
  handleClick: (id: WeatherMapLayerKeys, layer: WeatherMapLayerKeys) => void;
};

const LayerSelectButtons = (props: LayerSelectButtonsProps) => {
  const { layer, handleClick } = props;
  return (
    <Grid
      container
      flexDirection={{ xs: "row" }}
      justifyContent="center"
      alignContent="center"
      flexWrap="wrap"
      gap="0.5rem"
      sx={{
        marginTop: "1rem",
        padding: "1rem",
      }}
    >
      {layers.map(({ id, name }) => {
        return (
          <Button
            key={id}
            variant="outlined"
            onClick={() => handleClick(id, layer)}
            disabled={layer === id}
            sx={(theme) => ({
              ":disabled": {
                color: "white",
                backgroundColor: theme.palette.primary.main,
              },
            })}
          >
            {name}
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

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  layers,
  LegendType,
  WeatherMapLayerKeys,
  WeatherMapLayerNames,
} from "../../api/types";
import * as legends from "../../constants/legends";
import { capitalize } from "../../utils/string";

type LegendsProps = {
  layer: WeatherMapLayerKeys;
  layerName?: WeatherMapLayerNames;
};

const Legends = (props: LegendsProps) => {
  const { layer } = props;

  const name = layers.filter((_layer) => _layer.id === layer)[0].name;

  const data = legends[name] as LegendType[];

  return <Legend layerName={name} legend={data} />;
};

export default Legends;

type LegendProps = {
  layerName: string;
  legend: LegendType[];
};

const Legend = (props: LegendProps) => {
  const { layerName, legend } = props;

  return (
    <Grid
      container
      flexDirection={{ xs: "row", md: "row" }}
      wrap="nowrap"
      justifyContent="center"
      alignItems="center"
      gap="0.5rem"
    >
      <Grid item>
        <Typography variant="subtitle2" component="h6">
          {capitalize(layerName)}
        </Typography>
      </Grid>
      <Grid
        item
        container
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="0.25rem"
        wrap="nowrap"
        sx={{ maxWidth: "20rem" }}
      >
        {legend.map((row) => {
          return (
            <Grid
              item
              key={row.value}
              sx={{
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                backgroundColor: row.color,
              }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

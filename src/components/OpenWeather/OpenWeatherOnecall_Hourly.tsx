import { Typography, Paper } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import ChartTemps from "./Charts/ChartTemps";
import ChartHumidity from "./Charts/ChartHumidity";
import ChartPrecipitation from "./Charts/ChartPrecipitation";
import ChartWind from "./Charts/ChartWind";
import ChartPressure from "./Charts/ChartPressure";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  paper: {
    padding: "1rem",
  },
  charts: {
    height: "200px",
  },
  chartsHumid: {
    height: "250px",
  },
}));

const OpenWeatherOnecall_Hourly: React.FC = () => {
  const classes = useStyles();
  console.log("hourly");

  return (
    <>
      <Typography variant="h6" className={classes.text}>
        Hourly
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" align="center" className={classes.text}>
          Hourly Fourcast for 48 Hours
        </Typography>
        <div className={classes.charts}>
          <ChartTemps />
        </div>
        <div className={classes.chartsHumid}>
          <ChartHumidity />
        </div>
        <div className={classes.charts}>
          <ChartPrecipitation />
        </div>
        <div className={classes.charts}>
          <ChartWind />
        </div>
        <div className={classes.charts}>
          <ChartPressure />
        </div>
      </Paper>
    </>
  );
};

export default OpenWeatherOnecall_Hourly;

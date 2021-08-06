import { Grid, Typography } from '@material-ui/core';

const Footer = () => {
  const dt = new Date();
  const year = dt.getFullYear();

  return (
    <footer>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2">
            Copyrihgt &copy; kmi {year}. All rights reserved. | Powered by&nbsp;
            <a
              href="https://www.openweathermap.org/"
              title="Open Weather"
              rel="noreferrer"
              target="_blank"
            >
              OpenWeather.com
            </a>
            and
            <a
              href="https://www.weatherapi.com/"
              title="Free Weather API"
              rel="noreferrer"
              target="_blank"
            >
              WeatherAPI.com
            </a>
            .
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

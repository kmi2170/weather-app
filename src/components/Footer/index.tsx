import { memo } from "react";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ padding: "10px" }}>
      <Typography variant="body2">
        &copy; kmi {year}. All rights reserved. | Powered by&nbsp;
        <a
          href="https://www.openweathermap.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          OpenWeather.com
        </a>
        .
      </Typography>
    </footer>
  );
};

export default memo(Footer);

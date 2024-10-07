import { memo } from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ margin: "20px 10px 30px 0" }}>
      <Typography variant="body2">
        &copy; {year} Kemmei H. | Powered by OpenWeather.com
        {/* <a
          href="https://www.openweathermap.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          OpenWeather.com
        </a> */}
        .
      </Typography>
    </footer>
  );
};

export default memo(Footer);

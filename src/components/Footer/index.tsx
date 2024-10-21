import { memo } from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Typography
      component="footer"
      variant="body2"
      sx={{
        margin: "20px 10px 30px 0",
      }}
    >
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
  );
};

export default memo(Footer);

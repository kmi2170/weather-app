import Typography from "@mui/material/Typography";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Typography
      component="footer"
      variant="body2"
      sx={{
        m: "20px 10px 30px 0",
      }}
    >
      &copy; {year} Kemmei H. | Powered by OpenWeather.com
    </Typography>
  );
};

export default Footer;

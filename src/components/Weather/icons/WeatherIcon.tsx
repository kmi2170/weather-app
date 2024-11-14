import { styled, useTheme } from "@mui/material/styles";

const WeatherIconComponent = styled("i")<{ size: string; color: string }>(
  ({ size, color }) => ({ fontSize: size, color })
);

interface WeatherIconProps {
  weatherId: number;
  size: string;
  iconColor?: string;
  isDay?: boolean;
}

const WeatherIcon = ({
  weatherId,
  size = "2rem",
  iconColor,
  isDay = true,
}: WeatherIconProps) => {
  const theme = useTheme();
  const period = isDay ? "day" : "night";

  return (
    <WeatherIconComponent
      size={size}
      color={iconColor || theme.palette.primary.main}
      className={`wi wi-owm-${period}-${weatherId} `}
    />
  );
};

export default WeatherIcon;

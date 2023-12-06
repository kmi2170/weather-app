import { useCookies } from "react-cookie";
import { Location, Units } from "../features/initialState";

const cookiesOptions = {
  path: "/",
  maxAge: 2600000,
  sameSite: true,
};

export const useCustomCookies = () => {
  const [cookies, setCookie] = useCookies([
    "weather_location",
    "weather_units",
  ]);

  const setLocationCookie = (location: Location) =>
    setCookie("weather_location", location, cookiesOptions);

  const setUnitsCookie = (units: Units) =>
    setCookie("weather_units", units, cookiesOptions);

  return { cookies, setLocationCookie, setUnitsCookie };
};

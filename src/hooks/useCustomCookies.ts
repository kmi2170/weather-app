import { useCookies } from 'react-cookie';
import { Units } from '../features/initialState';

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

export const useCustomeCookies = () => {
  const [cookies, setCookie] = useCookies([
    'weather_location',
    'weather_units',
  ]);

  const setLocationCookie = location =>
    setCookie('weather_location', location, cookiesOptions);

  const setUnitsCookie = (units: Units) =>
    setCookie('weather_units', units, cookiesOptions);

  return { cookies, setLocationCookie, setUnitsCookie };
};

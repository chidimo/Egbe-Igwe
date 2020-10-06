import { useHistory } from 'react-router-dom';
import { getCityWeather } from '../city/actions';
import { useWeatherDispatch } from '../city/context/useWeather';

export const useRouteToCity = () => {
  const history = useHistory();
  const wDispatch = useWeatherDispatch();

  const routeToCity = (coords, setFetching) => {
    getCityWeather(coords)(wDispatch)
      .then((res) => {
        if (res.success) {
          const { name, lat, lon } = res.data.location;
          history.push({ pathname: `/city/${name}/${lat},${lon}` });
        }
      })
      .catch((err) => {
        setFetching(false);
        alert('Unable to retrieve your location at this time.');
        return err;
      });
  };

  return { routeToCity };
};

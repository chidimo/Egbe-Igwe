import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import { getCityWeather } from '../city/actions';
import { useWeatherDispatch } from '../city/context/useWeather';

const toastId = Symbol('tId');

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
        toast.error('Unable to retrieve your location at this time.', {
          toastId,
        });
        return err;
      });
  };

  return { routeToCity };
};

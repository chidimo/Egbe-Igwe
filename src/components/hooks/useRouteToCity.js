import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import { getCityWeather } from '../city/actions';
import { useStoreDispatch } from '../../context/useStore';
import { ENLIST_CITY } from '../../context/aTypes';

const toastId = Symbol('tId');

export const useRouteToCity = () => {
  const history = useHistory();
  const storeDispatch = useStoreDispatch();

  const routeToCity = (query, useName, setFetching) => {
    getCityWeather(query)(storeDispatch)
      .then((res) => {
        if (res.success) {
          const { location } = res.data;
          const { name, lat, lon, country } = location;
          storeDispatch({
            type: ENLIST_CITY,
            city: { Name: name, Country: country },
          });

          if (useName) {
            history.push({ pathname: `/city/${name}` });
          } else {
            history.push({ pathname: `/city/${name}/${lat},${lon}` });
          }
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

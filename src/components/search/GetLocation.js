import React from 'react';
import { toast } from 'react-toastify';

import { LocatingLoader } from '../AppLoaders';
import { IconSet } from '../IconSet';
import { useRouteToCity } from '../hooks/useRouteToCity';

import './search.scss';

export const GetLocation = () => {
  const gl = window.navigator.geolocation;
  const [ isLocating, setLocating ] = React.useState(false);

  const { routeToCity } = useRouteToCity();

  const promiseGeo = (options = {}) =>
    new Promise((resolve, reject) => {
      gl.getCurrentPosition(resolve, reject, options);
    });

  const showMyCity = async () => {
    if (!gl) {
      toast.info('Geolocation is not supported by this browser.');
    } else {
      setLocating(true);
      promiseGeo()
        .then((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          routeToCity(`${lat},${lon}`, false, setLocating);
        })
        .catch(() => {
          toast.error('Unable to retrieve your location at this time.');
          setLocating(false);
        });
    }
  };

  return (
    <div
      className="location-container pointer"
      tabIndex="4"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          showMyCity();
        }
      }}
    >
      <span data-testid="locate-me" onClick={showMyCity}>
        {isLocating ? (
          <LocatingLoader height={25} width={25} />
        ) : (
          <IconSet name="my-location" color="red" size="1.7rem" />
        )}
      </span>
    </div>
  );
};

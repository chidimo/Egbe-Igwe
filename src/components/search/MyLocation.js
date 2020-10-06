import React from 'react';
import { LocatingLoader } from '../AppLoaders';
import { IconSet } from '../IconSet';
import { useRouteToCity } from '../hooks/useRouteToCity';

import './search.scss';

export const MyLocation = () => {
  const [ isLocating, setLocating ] = React.useState(false);

  const { routeToCity } = useRouteToCity();

  const promiseGeo = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const showMyCity = async () => {
    const gl = window.navigator.geolocation;
    if (!gl) {
      alert('Geolocation is not supported by this browser.');
    } else {
      setLocating(true);
      promiseGeo()
        .then((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coords = `${lat},${lon}`;
          routeToCity(coords, setLocating);
        })
        .catch(() => {
          alert('Unable to retrieve your location at this time.');
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
      <span onClick={showMyCity}>
        {isLocating ? (
          <LocatingLoader height={25} width={25} />
        ) : (
          <IconSet name="my-location" color="red" size="1.7rem" />
        )}
      </span>
    </div>
  );
};

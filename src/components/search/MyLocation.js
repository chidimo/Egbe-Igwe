import React from 'react';
import { useHistory } from 'react-router-dom';
import { LocatingLoader } from '../AppLoaders';
import { getCurrentCityWeather } from '../city/actions';
import { useWeatherDispatch } from '../city/context/useWeather';
import { IconSet } from '../IconSet';

import './search.scss';

export const MyLocation = () => {
  const history = useHistory();
  const wDispatch = useWeatherDispatch();

  const [isLocating, setLocating] = React.useState(false);

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

          getCurrentCityWeather(`${lat}, ${lon}`)(wDispatch)
            .then((res) => {
              if (res.success) {
                history.push({ pathname: `/city/${res.cityName}` });
              }
            })
            .catch((err) => {
              setLocating(false);
              alert('Unable to retrieve your location at this time.');
              return err;
            });
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
          <LocatingLoader />
        ) : (
          <IconSet name="my-location" color="red" size="1.7rem" />
        )}
      </span>
    </div>
  );
};

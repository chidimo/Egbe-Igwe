import React from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentCityWeather } from '../city/actions';
import { useWeatherDispatch } from '../city/context/useWeather';

import './search.scss';

export const SearchCard = (props) => {
  const history = useHistory();
  const wDispatch = useWeatherDispatch();

  const { city } = props;
  const { name, formatted_address, geometry } = city;
  const {
    location: { lat, lng },
  } = geometry;

  return (
    <div
      className="search-card pointer"
      onClick={() => {
        getCurrentCityWeather(`${lat}, ${lng}`)(wDispatch)
          .then((res) => {
            if (res.success) {
              history.push({ pathname: `/city/${res.cityName}` });
            }
          })
          .catch((err) => {
            alert('Unable to retrieve your location at this time.');
            return err;
          });
      }}
    >
      <p>{name}</p>
      <p>{formatted_address}</p>
    </div>
  );
};
